<script lang="ts">
	import VideoGrid from '$lib/Components/VideoGrid.svelte'
	export let data
</script>

<VideoGrid feed={data.feed} />
