<script lang="ts">
	import type { ComponentType } from 'svelte'

	export let label: string
	export let visualLabel: string | undefined = undefined
	export let size = '1.25rem'
	export let icon: ComponentType
	export let type: 'submit' | null = null
	export let weight = 'bold'
	export let filled = false
	export let showLabel = visualLabel ? true : false
	export let disabled = false
	export let color = 'var(--icon-clr)'

	export let direction: 'column' | 'row' = 'column'
</script>

<label class:disabled>
	<span class="sr-only">{label} {direction}</span>
	<button
		{disabled}
		{type}
		on:click
		class="button"
		class:row={direction == 'row'}
	>
		<div class="icon" style:color>
			<svelte:component this={icon} weight={filled ? 'fill' : weight} {size} />
		</div>
		{#if showLabel}
			<span aria-hidden="true" class="label">{visualLabel}</span>
		{/if}
	</button>
</label>

<style lang="postcss">
	label {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		.label {
			text-transform: capitalize;
			font-weight: 500;
		}
		&.disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}
	.button {
		background: none;
		border: none;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.125rem;
		padding: 0.5rem;
		font-weight: 500;
		border-radius: 0.25rem;
		width: fit-content;

		&.row {
			flex-direction: row;
			gap: 0.5rem;
		}
	}
	.icon :global(svg) {
		vertical-align: middle;
	}
</style>
