<script lang="ts">
	import { page } from '$app/stores'
	import MetaTags from '$lib/Components/MetaTags.svelte'
	import Page from '$lib/Components/Page.svelte'
	import type { Account } from '$lib/types'
	$: self = <Account>$page.data.self

	export let form: { success: boolean; message?: string } | null = null
</script>

<MetaTags
	value={{
		title: 'Profile settings - Loops',
		description: 'Update your profile on Loops'
	}}
/>

<Page title="Profile settings">
	<div>
		<form enctype="multipart/form-data" action="?/updateprofile" method="post">
			<h1>Settings</h1>
			{#if form}
				{#if form.success}
					<p class="status">Successfully updated profile</p>
				{:else}
					<p class="status error">
						{form.message ?? 'Failed to update profile'}
					</p>
				{/if}
			{/if}
			<label>
				Username
				<input disabled type="text" name="username" value={self.username} />
			</label>
			<label>
				Display name
				<input type="text" name="name" value={self.name} />
			</label>
			<label>
				Bio
				<input type="text" name="bio" value={self.bio} />
			</label>
			<label>
				Avatar
				<input accept="image/*" type="file" name="avatar" id="" />
			</label>
			<button type="submit">Save</button>
		</form>

		<br />
		<hr />
		<br />

		<form method="post" action="?/logout">
			<button type="submit">Logout</button>
		</form>
	</div>
</Page>

<style lang="postcss">
	h1 {
		font-size: 1.5rem;
		margin-block: 0.5rem;
	}
	form {
		display: grid;
		height: min-content;
		gap: 0.5rem;
		> label {
			display: grid;
			grid-template-columns: 8rem 1fr;
		}
	}
	.status {
		margin-block: 0;
		padding: 0.25rem;
		background-color: rgb(120 120 255 / 0.2);
		&.error {
			background-color: rgb(255 120 120 / 0.2);
		}
		border-radius: 0.25rem;
	}
</style>
