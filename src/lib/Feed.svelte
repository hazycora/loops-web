<script lang="ts">
	import { onMount } from 'svelte'
	import FeedVideo from './FeedVideo.svelte'
	import extendPaginated from './extendPaginated'
	import CommentComponent from './Comment.svelte'
	import LoadingSpinner from './LoadingSpinner.svelte'

	import { mobile } from './stores'
	import { browser } from '$app/environment'

	export let feed: Feed
	export let startIndex = 0

	let clientHeight: number
	let feedElement: HTMLElement

	let activeIndex = 0
	let fetching = false

	let activeVideo: Video
	$: activeVideo = feed.data[activeIndex]
	$: comments = fetchComments(activeVideo.id)

	async function fetchComments(id: string) {
		if (!browser) return
		const commentsResponse = await fetch(`/api/v0/comments/id/${id}`)
		return <Paginated<Comment>>await commentsResponse.json()
	}

	async function loadMore() {
		if (fetching) return
		fetching = true
		feed = await extendPaginated(feed)
		fetching = false
	}

	function onScroll(event: Event) {
		if (!event.target) return
		const target = event.target as HTMLElement
		activeIndex = Math.ceil(target.scrollTop / clientHeight)

		if (feed.data.length - 1 <= activeIndex) {
			loadMore()
		}
	}

	onMount(() => {
		if (!feedElement || !clientHeight) return
		feedElement.scrollTo({ top: startIndex * clientHeight })
	})
</script>

<div class="player-wrapper">
	<div
		bind:this={feedElement}
		bind:clientHeight
		class="feed"
		on:scroll={onScroll}
	>
		{#each feed.data as video, i}
			<FeedVideo {video} active={activeIndex == i} />
		{/each}
	</div>

	{#if !$mobile}
		<div class="details">
			<div class="video-info">
				{#if activeVideo.caption}
					<p class="caption">{activeVideo.caption}</p>
				{/if}
				<a href="/user/{activeVideo.account.id}" class="account">
					<img src={activeVideo.account.avatar} alt="" class="avatar" />
					<div class="names">
						{#if activeVideo.account.username != activeVideo.account.name}
							<span class="name">{activeVideo.account.name}</span>
						{/if}
						<span class="username">@{activeVideo.account.username}</span>
					</div>
				</a>
			</div>
			{#await comments}
				<LoadingSpinner />
			{:then comments}
				{#if comments.data.length > 0}
					<ul class="comments">
						{#each comments.data as comment}
							<li>
								<CommentComponent {comment} />
							</li>
						{/each}
					</ul>
				{:else}
					<p class="comments">There are no comments yet.</p>
				{/if}
			{/await}
		</div>
	{/if}
</div>

<style lang="postcss">
	.player-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		aspect-ratio: 18 / 16;
		@media (max-width: 40rem) {
			grid-template-columns: 1fr;
			aspect-ratio: 9 / 16;
		}
		max-width: 100%;
		max-height: 100%;
		border-radius: 0.5rem;
		overflow: hidden;
		margin-inline: auto;
		align-self: center;
	}
	.feed {
		aspect-ratio: 9 / 16;
		width: 100%;
		min-width: 0;

		overflow-y: auto;
		overflow-x: hidden;

		scroll-snap-type: y mandatory;
		scrollbar-width: none;
	}
	.details {
		display: grid;
		grid-template-rows: min-content 1fr;
		background: rgb(255 255 255 / 0.1);
	}
	.video-info {
		border-block-end: 1px solid rgb(255 255 255 / 0.2);
		padding: 0.5rem;
		.caption {
			margin-block: 0;
			margin-block-end: 0.5rem;
			font-weight: 600;
			font-size: 1.125rem;
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
	.comments {
		margin: 0;
		padding: 0.5rem;
		&:is(ul) {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			list-style: none;
		}
	}
</style>
