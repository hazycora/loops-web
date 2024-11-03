<script lang="ts">
	import VideoGrid from '$lib/VideoGrid.svelte'
	export let data
</script>

<VideoGrid feed={data.feed} />
