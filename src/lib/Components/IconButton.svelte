<script lang="ts">
	import type { ComponentType } from 'svelte'

	export let label: string
	export let icon: ComponentType
	export let type: 'submit' | null = null
</script>

<label>
	<span class="sr-only">{label}</span>
	<button {type} on:click class="button">
		<svelte:component this={icon} weight="bold" size="1.25rem" />
	</button>
</label>

<style lang="postcss">
	.button {
		background: none;
		border: none;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		font-weight: 500;
		border-radius: 0.25rem;
		width: fit-content;
	}
</style>
