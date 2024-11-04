<script lang="ts">
	import Profile from '$lib/Components/Profile.svelte'

	export let data
</script>

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
