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
		description: `${data.video.likes} likes, ${data.video.comments} comments - Uploaded by @${data.video.account.username} on Loops`,
		image: data.video.media.thumbnail,
		video: data.video
	}}
/>

<FeedComponent
	bind:activeVideo
	feed={data.accountFeed}
	startIndex={data.accountFeedIndex}
/>
