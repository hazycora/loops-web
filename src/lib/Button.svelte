<script lang="ts">
	import type { ComponentType } from 'svelte'

	export let text: string
	export let href: string
	export let icon: ComponentType
</script>

<a {href} class="button">
	<svelte:component this={icon} weight="bold" size="1.125rem" />
	{text}
</a>

<style lang="postcss">
	.button {
		text-decoration: none;
		color: inherit;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.375rem;
		font-weight: 500;
		border-radius: 0.25rem;
		background-color: var(--button-bg-clr);
		width: fit-content;
	}
</style>
