<script lang="ts">
	import type { ComponentType } from 'svelte'

	export let label: string
	export let size = '1.25rem'
	export let icon: ComponentType
	export let type: 'submit' | null = null
	export let weight = 'bold'
	export let filled = false
	export let showLabel = false
	export let disabled = false
</script>

<label class:disabled>
	<span class="label" class:sr-only={!showLabel}>{label}</span>
	<button {disabled} {type} on:click class="button">
		<svelte:component this={icon} weight={filled ? 'fill' : weight} {size} />
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
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		font-weight: 500;
		border-radius: 0.25rem;
		width: fit-content;
	}
</style>
