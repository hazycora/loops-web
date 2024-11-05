<script lang="ts">
	import MetaTags from '$lib/Components/MetaTags.svelte'
	import Profile from '$lib/Components/Profile.svelte'
	import Page from '$lib/Components/Page.svelte'

	export let data
</script>

<MetaTags
	value={{
		title: `${data.account.name} on Loops`,
		description: `View @${data.account.username}'s profile and videos`,
		image: data.account.avatar
	}}
/>

<Page title={data.account.name}>
	<div class="profile">
		<Profile account={data.account} followState={data.followState} />
		<slot />
	</div>
</Page>

<style lang="postcss">
	.profile {
		width: 100%;
		height: 100%;
		> :global(:first-child) {
			margin-block-end: 1rem;
		}
	}
</style>
