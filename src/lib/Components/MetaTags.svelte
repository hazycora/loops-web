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
	<meta property="twitter:title" content={value.title} />
	<meta property="twitter:description" content={value.description} />
	{#if value.image}
		<meta property="og:image" content={value.image} />
		<meta property="twitter:image" content={value.image} />
	{/if}
	{#if value.video}
		<meta property="og:video" content={value.video.media.src_url} />
		<meta property="og:video:secure_url" content={value.video.media.src_url} />
		<meta
			property="og:video:height"
			content={value.video.media.height.toString()}
		/>
		<meta
			property="og:video:width"
			content={value.video.media.width.toString()}
		/>
		<meta property="og:video:type" content="video/mp4" />
	{:else}
		<meta property="twitter:card" content="summary" />
	{/if}
</svelte:head>
