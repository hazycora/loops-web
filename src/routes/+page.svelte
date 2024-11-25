<script lang="ts">
	import MetaTags from '$lib/Components/MetaTags.svelte'

	export let form
</script>

<MetaTags
	value={{
		title: 'Loops',
		description:
			'Discover and share videos on Loops by Pixelfed - an open-source short-form video platform.'
	}}
/>

<div class="page">
	<form method="post">
		<p>An unofficial client for <a href="https://loops.video">Loops</a></p>
		<label>
			Email
			<input
				value={form?.email ?? ''}
				type="text"
				name="email"
				placeholder="jane@example.com"
			/>
		</label>
		<label>
			Password
			<input
				value={form?.password ?? ''}
				type="password"
				name="password"
				placeholder="****"
			/>
		</label>
		{#if form?.['2FC']}
			<label>
				2FA code
				<!-- svelte-ignore a11y-autofocus -->
				<input autofocus name="code" type="text" placeholder="123456" />
			</label>
		{/if}
		<input type="submit" value="Log in" />
		<p>
			<a href="https://git.gay/h/loops-web">source code</a>
		</p>
	</form>
</div>

<style lang="postcss">
	form {
		display: grid;
		height: min-content;
		gap: 0.5rem;
		width: 20rem;
		max-width: 100%;
		margin-inline: auto;
		padding-block: 2rem;

		> label {
			display: grid;
			grid-template-columns: 8rem 1fr;
		}
	}
</style>
