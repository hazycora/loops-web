<script lang="ts">
	import Feed from '$lib/Components/Feed.svelte'
	import MetaTags from '$lib/Components/MetaTags.svelte'

	export let data
</script>

<MetaTags
	value={{
		title: 'Following - Loops',
		description: 'A new short-form video platform by Pixelfed'
	}}
/>

<Feed feed={data.feed} />
