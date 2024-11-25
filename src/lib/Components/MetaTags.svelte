<script lang="ts">
	import type { Video } from '$lib/types'

	export let value: {
		title: string
		description: string
		image?: string
		video?: Video
		type?: string
	}
</script>

<svelte:head>
	<title>{value.title}</title>
	<meta name="description" content={value.description} />
	{#if value.type}
		<meta property="og:type" content={value.type} />
	{/if}
	<meta property="og:title" content={value.title} />
	<meta property="og:description" content={value.description} />
	<meta name="twitter:title" content={value.title} />
	<meta name="twitter:description" content={value.description} />
	{#if value.image}
		<meta property="og:image" content={value.image} />
		<meta name="twitter:image" content={value.image} />
	{/if}
	{#if value.video}
		<meta property="og:video" content={value.video.media.src_url} />
		<meta property="og:video:secure_url" content={value.video.media.src_url} />
		<meta property="og:video:height" content="1280" />
		<meta property="og:video:width" content="720" />
		<meta property="og:video:type" content="video/mp4" />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
</svelte:head>
