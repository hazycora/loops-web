<script lang="ts">
	import FeedComponent from '$lib/Components/Feed.svelte'
	import MetaTags from '$lib/Components/MetaTags.svelte'
	import type { Feed, Video } from '$lib/types'

	export let data: {
		video: Video
		accountFeed: Feed
		accountFeedIndex: number
	}

	let activeVideo: Video | null = null

	// TODO: update URL when activeVideo changes
</script>

<MetaTags
	value={{
		type: 'video.other',
		title: `${data.video.caption} by @${data.video.account.username} on Loops`,
		description: `View ${data.video.account.name}'s videos`,
		video: data.video
	}}
/>

<FeedComponent
	bind:activeVideo
	feed={data.accountFeed}
	startIndex={data.accountFeedIndex}
/>
