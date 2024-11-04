<script lang="ts">
	import type { Account, Paginated } from '$lib/types'
	import ProfileItem from './ProfileItem.svelte'

	export let accounts: Paginated<Account>
</script>

<div class="account-list">
	{#if accounts.data.length}
		{#each accounts.data as account}
			<ProfileItem {account} />
		{/each}
	{:else}
		<slot />
	{/if}
</div>

<style lang="postcss">
	.account-list {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		height: min-content;
	}
</style>
