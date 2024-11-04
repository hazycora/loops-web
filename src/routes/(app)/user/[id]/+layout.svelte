<script lang="ts">
	import MetaTags from '$lib/Components/MetaTags.svelte'
	import Profile from '$lib/Components/Profile.svelte'

	export let data
</script>

<MetaTags
	value={{
		title: `@${data.account.username} on Loops`,
		description: `View ${data.account.name}'s profile and videos`,
		image: data.account.avatar
	}}
/>

<div class="profile">
	<Profile account={data.account} followState={data.followState} />
	<slot />
</div>

<style lang="postcss">
	.profile {
		width: 100%;
		height: 100%;
		> :global(:first-child) {
			margin-block-end: 1rem;
		}
	}
</style>
