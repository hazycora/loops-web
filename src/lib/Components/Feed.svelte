<script lang="ts">
	import { onMount } from 'svelte'
	import FeedVideo from './FeedVideo.svelte'
	import extendPaginated from '$lib/extendPaginated'

	import VideoInfo from './VideoInfo.svelte'
	import type { Feed, Video } from '$lib/types'

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

		width: 100%;
		height: 100%;
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
