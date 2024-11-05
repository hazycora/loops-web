<script lang="ts">
	import type { ComponentType } from 'svelte'
	import IconButton from './IconButton.svelte'

	export let icon: ComponentType
	export let value = ''
	export let submitLabel: string
	export let placeholder: string

	export let method: string | undefined = undefined
	export let name: string | undefined = undefined
</script>

<form class="add-comment" on:submit {method}>
	<input bind:value type="text" {name} {placeholder} />
	<IconButton type="submit" label={submitLabel} {icon} />
</form>

<style lang="postcss">
	form {
		display: grid;
		grid-template-columns: 1fr min-content;
		align-items: center;
		input {
			background: none;
			border: none;
			padding: 0.75rem 0.5rem;
		}
	}
</style>
