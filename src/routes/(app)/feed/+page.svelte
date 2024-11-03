<script lang="ts">
	import Feed from '$lib/Feed.svelte'

	export let data
</script>

<Feed feed={data.feed} />
