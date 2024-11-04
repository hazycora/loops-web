<script lang="ts">
	export let value: {
		title: string
		description: string
		image?: string
		video?: string
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
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content={value.title} />
	<meta property="twitter:description" content={value.description} />
	{#if value.image}
		<meta property="og:image" content={value.image} />
		<meta property="twitter:image" content={value.image} />
	{/if}
	{#if value.video}
		<meta property="og:video" content={value.video} />
		<meta property="twitter:player:stream" content={value.video} />
	{/if}
</svelte:head>
