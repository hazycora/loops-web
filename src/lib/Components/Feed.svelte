<script lang="ts">
	import { onMount } from 'svelte'
	import FeedVideo from './FeedVideo.svelte'
	import extendPaginated from '$lib/extendPaginated'

	import VideoInfo from './VideoInfo.svelte'
	import type { Feed, Video } from '$lib/types'
	import { page } from '$app/stores'

	let feeds = [
		{ id: 'following', title: 'Following' },
		{ id: 'for-you', title: 'For You' }
	]

	export let feed: Feed
	export let startIndex = 0

	let clientHeight: number
	let feedElement: HTMLElement

	let activeIndex = 0
	let fetching = false

	export let activeVideo: Video | null = null
	$: activeVideo = feed.data[activeIndex]

	async function loadMore() {
		if (fetching) return
		fetching = true
		feed = await extendPaginated(feed)
		fetching = false
	}

	function onScroll(event: Event) {
		if (!event.target) return
		const target = event.target as HTMLElement
		activeIndex = Math.round(target.scrollTop / clientHeight)

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
	<div class="feeds">
		{#each feeds as feed}
			<a
				href="/feed/{feed.id}"
				class:active={$page.url.pathname == `/feed/${feed.id}`}
			>
				{feed.title}
			</a>
		{/each}
	</div>
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
	<div class="info">
		<VideoInfo video={activeVideo} />
	</div>
</div>

<style lang="postcss">
	.player-wrapper {
		display: grid;
		@media not (max-width: 40rem) {
			grid-template-columns: 1fr 1fr;
			border-radius: 0.5rem;
			height: 100%;
		}
		overflow: hidden;
		margin-inline: auto;
		align-self: center;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.feeds {
		position: absolute;
		inset-block-start: env(safe-area-inset-top, 0);
		inset-inline: 0;
		z-index: 101;
		display: flex;
		justify-content: center;
		gap: 1rem;
		font-weight: 700;
		font-size: 1.125rem;
		padding: 0.5rem 0;

		filter: drop-shadow(0 0 0.5rem rgb(0 0 0 / 0.75))
			drop-shadow(0 0 0.125rem rgb(0 0 0 / 0.5));

		@media not (max-width: 40rem) {
			width: 50%;
		}

		> a {
			color: inherit;
			text-decoration: none;
			&.active {
				color: var(--primary-clr);
			}
			&.active::after {
				margin-inline: auto;
				margin-block-start: 0.25rem;
				display: block;
				content: '';
				width: 2rem;
				height: 0.125rem;
				background-color: currentColor;
				border-radius: 0.25rem;
			}
		}
	}

	.feed {
		width: 100%;
		min-width: 0;
		min-height: 0;

		overflow-y: auto;
		overflow-x: hidden;

		scroll-snap-type: y mandatory;
		scrollbar-width: none;
	}
	@media (max-width: 40rem) {
		.info {
			display: none;
		}
	}
</style>
