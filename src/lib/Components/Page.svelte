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
	.page {
		position: relative;
		/* block seeing the scrollbar above the top of the header. this could otherwise happen due to overscroll, like in iOS */
		&::before {
			content: '';
			position: absolute;
			display: block;
			background-color: var(--bg-clr);
			top: -100vh;
			height: 100vh;
			inset-inline: 0;

			z-index: 9999;
		}
	}
	header {
		background-color: rgb(0 0 0 / 0.75);
		backdrop-filter: blur(10px);
		border-block-end: 1px solid var(--border-clr);
		padding: 0.625rem 0.5rem;
		padding-block-start: calc(env(safe-area-inset-top) + 0.625rem);
		position: sticky;
		top: 0;
		text-align: center;
		line-height: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.title {
		font-weight: 700;
		margin-block: 0;
		text-align: center;
	}
	.subtitle {
		color: var(--muted-clr);
		text-align: center;
		font-size: 0.75rem;
	}
	main {
		padding: 0.75rem 0.5rem;
		padding-block-left: calc(env(safe-area-inset-left) + 0.5rem);
		padding-block-right: calc(env(safe-area-inset-right) + 0.5rem);
	}
	:global(.app:not(:has(> nav.desktop))) header {
		display: none;
	}
	@media not (max-width: 40rem) {
		header {
			display: none;
		}
	}
</style>
