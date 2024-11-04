<script lang="ts">
	import { goto, pushState } from '$app/navigation'
	import { page } from '$app/stores'
	import FeedComponent from '$lib/Feed.svelte'

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
