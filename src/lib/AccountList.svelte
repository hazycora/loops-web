<script lang="ts">
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
