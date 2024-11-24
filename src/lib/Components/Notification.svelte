<script lang="ts">
	import type { Notification } from '$lib/types'

	export let notification: Notification
</script>

{#if notification.type == 'new_follower'}
	<a href="/@{notification.actor.username}" class="notification">
		<img src={notification.actor.avatar} alt="" class="avatar" />
		<div class="text">
			<strong class="actor">@{notification.actor.username}</strong>
			<span>followed you</span>
		</div>
	</a>
{:else if notification.type == 'video.like'}
	<div class="notification">
		<a href="/@{notification.actor.username}">
			<img src={notification.actor.avatar} alt="" class="avatar" />
		</a>
		<a href="/@{notification.actor.username}" class="text">
			<strong class="actor">@{notification.actor.username}</strong>
			<span>liked your video</span>
		</a>
		<a href="/v/{notification.video_id}" class="thumbnail">
			<img src={notification.video_thumbnail} alt="" />
		</a>
	</div>
{/if}

<style lang="postcss">
	.notification {
		display: grid;
		padding: 0.5rem;
		border-bottom: 1px solid var(--border-clr);
		color: var(--muted-clr);
		text-decoration: none;

		grid-template-columns: 2.5rem 1fr;
		gap: 0.5rem;
		align-items: center;
		font-size: 0.875rem;

		a {
			color: inherit;
			text-decoration: none;
		}

		&:has(.thumbnail) {
			grid-template-columns: 2.5rem 1fr 3rem;
		}
	}

	.avatar {
		border-radius: 100%;
		width: 2.5rem;
		height: 2.5rem;
	}

	.text {
		height: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.25rem;
		line-height: 1;
	}

	.actor {
		font-weight: 600;
		color: var(--text-clr);
	}

	.thumbnail {
		img {
			width: 100%;
			aspect-ratio: 1;
			object-fit: cover;
			border-radius: 0.5rem;
		}
	}
</style>
