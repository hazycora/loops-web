<script lang="ts">
	import { onMount } from 'svelte'
	import FeedVideo from './FeedVideo.svelte'
	import extendFeed from './extendFeed'

	export let feed: Feed
	export let startIndex = 0

	let clientHeight: number
	let feedElement: HTMLElement

	let activeIndex = 0
	let fetching = false

	async function loadMore() {
		if (fetching) return
		fetching = true
		feed = await extendFeed(feed)
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

<style lang="postcss">
	.feed {
		overflow-y: auto;
		overflow-x: hidden;

		scroll-snap-type: y mandatory;
		scrollbar-width: none;

		border-radius: 0.5rem;
		aspect-ratio: 9/16;

		max-height: 100%;
		max-width: 100%;

		place-self: center;
	}
</style>
