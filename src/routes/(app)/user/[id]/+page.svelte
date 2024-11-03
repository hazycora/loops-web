<script lang="ts">
	import Profile from '$lib/Profile.svelte'
	import VideoGrid from '$lib/VideoGrid.svelte'

	export let data
	$: account = data.account
</script>

<div class="profile">
	<Profile {account} />
	<VideoGrid feed={data.feed} />
</div>

<style lang="postcss">
	.profile {
		display: grid;
		gap: 1rem;
		width: 100%;
		height: 100%;
		grid-template-rows: min-content 1fr;
	}
</style>
