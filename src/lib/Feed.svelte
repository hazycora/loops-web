<script lang="ts">
	import { onMount } from 'svelte'
	import FeedVideo from './FeedVideo.svelte'
	import extendPaginated from './extendPaginated'

	import { mobile } from './stores'
	import VideoInfo from './VideoInfo.svelte'

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

	{#if !$mobile && activeVideo}
		<VideoInfo video={activeVideo} />
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
</style>
