<script lang="ts">
	import FeedVideo from './FeedVideo.svelte'

	export let feed: Feed
	let clientHeight: number

	let activeIndex = 0
	let fetching = false

	async function loadMore() {
		if (fetching) return
		fetching = true
		const cursor = feed.meta.next_cursor
		const forYouResponse = await fetch(`/api/v0/feed/for-you?cursor=${cursor}`)
		const forYouJson = <Feed>await forYouResponse.json()
		feed.meta = forYouJson.meta
		feed.data.push(...forYouJson.data)
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
</script>

<div bind:clientHeight class="feed" on:scroll={onScroll}>
	{#each feed.data as video, i}
		<FeedVideo {video} active={activeIndex == i} />
	{/each}
</div>

<style lang="postcss">
	.feed {
		--margin: 0.5rem;

		overflow-y: auto;
		overflow-x: hidden;

		scroll-snap-type: y mandatory;
		scrollbar-width: none;

		border-radius: 0.5rem;
		aspect-ratio: 9/16;

		height: calc(100vh - calc(var(--margin) * 2));
		height: calc(100svh - calc(var(--margin) * 2));
	}
</style>
