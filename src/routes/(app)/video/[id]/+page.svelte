<script lang="ts">
	import FeedComponent from '$lib/Components/Feed.svelte'
	import type { Feed, Video } from '$lib/types'

	export let data: {
		video: Video
		accountFeed: Feed
		accountFeedIndex: number
	}

	let activeVideo: Video | null = null

	// TODO: update URL when activeVideo changes
</script>

<FeedComponent
	bind:activeVideo
	feed={data.accountFeed}
	startIndex={data.accountFeedIndex}
/>
