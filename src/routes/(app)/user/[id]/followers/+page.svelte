<script lang="ts">
	import AccountList from '$lib/Components/AccountList.svelte'

	export let data
</script>

<h2>Followers</h2>
<AccountList accounts={data.accounts}>
	<p>No followers yet.</p>
</AccountList>

<style lang="postcss">
	p {
		margin: 0;
	}
</style>
