<script lang="ts">
	import ProfileItem from '$lib/ProfileItem.svelte'

	export let data
</script>

<h2>Followers</h2>
<div class="account-list">
	{#if data.accounts.data.length}
		{#each data.accounts.data as follower}
			<ProfileItem account={follower} />
		{/each}
	{:else}
		<p>No followers yet.</p>
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
