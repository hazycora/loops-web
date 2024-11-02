<script lang="ts">
	import FeedVideo from '$lib/FeedVideo.svelte'

	export let data
	$: videos = data.data
	$: console.log(videos)
</script>

<h1>for you :3</h1>

{#each videos as video}
	<FeedVideo {video} />
{/each}

<a href="/feed?cursor={data.meta.next_cursor}">Next page</a>
