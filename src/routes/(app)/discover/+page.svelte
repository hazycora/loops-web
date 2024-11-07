<script lang="ts">
	import AccountList from '$lib/Components/AccountList.svelte'
	import CleanInput from '$lib/Components/CleanInput.svelte'
	import type { Account, Paginated } from '$lib/types'
	import { MagnifyingGlass } from 'phosphor-svelte'
	export let data: { query: string; accounts?: Paginated<Account> }
</script>

<div class="bar">
	<CleanInput
		method="GET"
		name="q"
		bind:value={data.query}
		placeholder="@yassie_j"
		submitLabel="Search users"
		icon={MagnifyingGlass}
	/>
</div>

{#if data.accounts}
	<div class="results">
		<AccountList accounts={data.accounts}>
			<p>No results</p>
		</AccountList>
	</div>
{:else}
	<p class="results">Search for an account</p>
{/if}

<style lang="postcss">
	.bar {
		background-color: var(--bg-clr);
		border-block-end: 1px solid var(--border-clr);
		padding: 0.25rem;
		padding-block-start: calc(env(safe-area-inset-top) + 0.25rem);
		top: 0;
		position: sticky;
	}
	.results {
		padding: 0.5rem 0.5rem;
	}
	p.results {
		color: var(--muted-clr);
		text-align: center;
		font-size: 1.125rem;
		font-weight: 600;
	}
</style>
