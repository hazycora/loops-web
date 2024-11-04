<script lang="ts">
	import { page } from '$app/stores'
	import Trash from 'phosphor-svelte/lib/Trash'
	import IconButton from './IconButton.svelte'
	import type { Account, Comment } from '$lib/types'

	export let comment: Comment
	export let videoId: string

	// TODO: don't use active!
	// I don't want to bother doing this using svelte 4 stuff because the way i'd go about this is much different in svelte 5.
	let active = true

	$: self = <Account>$page.data.self

	async function deleteComment() {
		await fetch(
			`/api/v0/comments/delete/${comment.id}?video_id=${encodeURIComponent(videoId)}`,
			{ method: 'POST', body: JSON.stringify({}) }
		)
		active = false
	}
</script>

{#if active}
	<li class="comment">
		<a href="/user/{comment.account.id}">
			<img src={comment.account.avatar} alt="" class="avatar" />
		</a>
		<div class="text">
			<a href="/user/{comment.account.id}" class="account">
				{#if comment.account.username != comment.account.name}
					<span class="name">{comment.account.name}</span>
				{/if}
				<span class="username">@{comment.account.username}</span>
			</a>
			<p class="caption">{comment.caption}</p>
		</div>
		{#if self && self.id == comment.account.id}
			<div class="actions">
				<IconButton
					on:click={deleteComment}
					label="Delete comment"
					icon={Trash}
				/>
			</div>
		{/if}
	</li>
{/if}

<style lang="postcss">
	.comment {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: auto 1fr;
		&:has(.actions) {
			grid-template-columns: auto 1fr auto;
		}
	}

	.avatar {
		border-radius: 100%;
		width: 2.625rem;
		height: 2.625rem;
	}

	.text {
		display: flex;
		flex-direction: column;
	}
	.account {
		color: inherit;
		.name,
		:only-child {
			font-weight: 600;
		}
		.username:not(:only-child) {
			color: var(--muted-clr);
		}
		text-decoration: none;
	}
	.caption {
		margin-block: 0;
	}
</style>
