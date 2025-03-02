<script lang="ts">
	import { browser } from '$app/environment'
	import {
		Heart,
		ShareFat,
		DownloadSimple,
		PaperPlaneTilt
	} from 'phosphor-svelte'
	import IconButton from './IconButton.svelte'
	import Comment from './Comment.svelte'
	import LoadingSpinner from './LoadingSpinner.svelte'
	import type { Paginated, Video, Comment as CommentType } from '$lib/types'
	export let video: Video
	import { page } from '$app/stores'
	import { downloadVideo, toggleLikeVideo, shareVideo } from '$lib/videoActions'
	import CleanInput from './CleanInput.svelte'

	let comments: Promise<Paginated<CommentType> | undefined>
	let addedComments: CommentType[] = []

	$: {
		comments = fetchComments(video.id)
	}

	let commentValue: string

	async function fetchComments(id: string) {
		if (!browser) return
		addedComments = []
		const commentsResponse = await fetch(`/api/v0/comments/id/${id}`)
		return <Paginated<CommentType>>await commentsResponse.json()
	}

	async function addComment() {
		const storeCommentResponse = await fetch(`/api/v0/comments/store`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				comment: commentValue,
				video_id: video.id
			})
		})
		const newComment = await storeCommentResponse.json()
		addedComments = [newComment, ...addedComments]
	}
</script>

<div class="details">
	<div class="video-info">
		{#if video.caption}
			<p class="caption">{video.caption}</p>
		{/if}
		<a href="/@{video.account.username}" class="account">
			<img src={video.account.avatar} alt="" class="avatar" />
			<div class="names">
				{#if video.account.username != video.account.name}
					<span class="name">{video.account.name}</span>
				{/if}
				<span class="username">@{video.account.username}</span>
			</div>
		</a>
	</div>
	<div class="actions">
		<IconButton
			disabled={!$page.data.self}
			on:click={async () => {
				video = await toggleLikeVideo(video)
			}}
			size="2rem"
			weight="regular"
			icon={Heart}
			label="Like this video along with {video.likes} others"
			visualLabel={video.likes.toString()}
			direction="row"
			filled
			color={video.has_liked ? 'var(--favourite-clr)' : undefined}
		/>
		<IconButton
			disabled={!$page.data.self}
			on:click={() => shareVideo(video)}
			size="2rem"
			weight="regular"
			icon={ShareFat}
			label="Share video"
			filled
		/>
		<IconButton
			on:click={() => downloadVideo(video)}
			size="2rem"
			weight="regular"
			icon={DownloadSimple}
			label="Download video"
			filled
		/>
	</div>
	{#await comments}
		<LoadingSpinner />
	{:then comments}
		{#if comments && (comments.data.length > 0 || addedComments.length > 0)}
			<ul class="comments">
				{#each addedComments as comment}
					<li>
						<Comment videoId={video.id} {comment} />
					</li>
				{/each}
				{#each comments.data as comment}
					<Comment videoId={video.id} {comment} />
				{/each}
			</ul>
		{:else}
			<p class="comments">There are no comments yet.</p>
		{/if}
	{/await}
	{#if $page.data.self}
		<CleanInput
			on:submit={addComment}
			bind:value={commentValue}
			placeholder="Add comment"
			submitLabel="Send comment"
			icon={PaperPlaneTilt}
		/>
	{:else}
		<div class="add-comment logged-out">
			<span>You must be logged in to comment.</span>
		</div>
	{/if}
</div>

<style lang="postcss">
	.details {
		display: grid;
		grid-template-rows: min-content min-content 1fr;
		background: rgb(255 255 255 / 0.1);
		height: 100%;
		min-width: 0;
	}
	.video-info {
		padding: 0.5rem;
		.caption {
			margin-block: 0;
			margin-block-end: 0.5rem;
			font-weight: 600;
			font-size: 1.125rem;
			word-wrap: break-word;
			word-break: break-word;
		}
		.account {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			text-decoration: none;
			color: inherit;
			.names {
				display: flex;
				flex-direction: column;
				line-height: 1;
				.name,
				:only-child {
					font-weight: 600;
					font-size: 1.125rem;
				}
				.username:not(:only-child) {
					color: var(--muted-clr);
				}
			}
			img {
				border-radius: 100%;
				width: 2rem;
				height: 2rem;
			}
		}
	}
	.actions {
		display: grid;
		grid-auto-flow: column;
		border-block-end: 1px solid var(--border-clr);
	}
	.comments {
		margin: 0;
		padding: 0.5rem;
		overflow: hidden;
		overflow-y: auto;
		&:is(ul) {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			list-style: none;
		}
		border-block-end: 1px solid var(--border-clr);
	}
	.add-comment.logged-out {
		padding: 0.5rem;
	}
</style>
