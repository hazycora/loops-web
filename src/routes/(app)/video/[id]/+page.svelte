<script lang="ts">
	import FeedComponent from '$lib/Feed.svelte'

	export let data: {
		video: Video
		accountFeed: Feed
		accountFeedIndex: number
	}
</script>

<FeedComponent feed={data.accountFeed} startIndex={data.accountFeedIndex} />
