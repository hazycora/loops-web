<script lang="ts">
	export let title: string
	export let subtitle: string | null = null
</script>

<div class="page">
	<header>
		<span class="title">{title}</span>
		{#if subtitle}
			<span class="subtitle">{subtitle}</span>
		{/if}
	</header>
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	:global(.app:not(:has(> nav.desktop))) header {
		display: none;
	}
	@media not (max-width: 40rem) {
		header {
			display: none;
		}
	}
	header {
		background-color: rgb(0 0 0 / 0.75);
		backdrop-filter: blur(10px);
		border-block-end: 1px solid var(--border-clr);
		padding: 0.75rem 0.5rem;
		position: sticky;
		top: 0;
		text-align: center;
		line-height: 1;
	}
	.title {
		font-weight: 700;
		margin-block: 0;
		text-align: center;
	}
	.subtitle {
		color: var(--muted-clr);
		text-align: center;
	}
	main {
		padding: 0.25rem 0.5rem;
	}
</style>
