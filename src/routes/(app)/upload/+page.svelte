<script lang="ts">
	import Page from '$lib/Components/Page.svelte'
	import MetaTags from '$lib/Components/MetaTags.svelte'
	import type { Video } from '$lib/types'

	export let form: { success: boolean; message?: string; video: Video } | null =
		null
</script>

<MetaTags
	value={{
		title: 'Upload - Loops',
		description: 'Share your videos on Loops'
	}}
/>

<Page title="Upload">
	<form enctype="multipart/form-data" method="post">
		{#if form}
			{#if form.success}
				<p class="status">
					Successfully uploaded video <a href="/v/{form.video.id}">(view it?)</a
					>
				</p>
			{:else}
				<p class="status error">{form.message ?? 'Failed to upload video'}</p>
			{/if}
		{/if}
		<label>
			Caption
			<input type="text" name="description" />
		</label>
		<label>
			Video
			<input accept="video/*,.mov" type="file" name="video" id="" />
		</label>
		<button type="submit">Save</button>
	</form>
</Page>

<style lang="postcss">
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
