<script lang="ts">
	import Feed from '$lib/Feed.svelte'

	export let data
</script>

<div class="app">
	<Feed feed={data.feed} />
</div>

<style lang="postcss">
	.app {
		height: 100%;
		display: grid;
		place-items: center;
	}
</style>
