<script lang="ts">
	import AccountList from '$lib/Components/AccountList.svelte'

	export let data
</script>

<h2>Following</h2>
<AccountList accounts={data.accounts}>
	<p>Not following anyone yet.</p>
</AccountList>

<style lang="postcss">
	p {
		margin: 0;
	}
</style>
