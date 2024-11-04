<script lang="ts">
	import '../app.pcss'
	import type { Account } from '$lib/types'

	export let data: { self?: Account }
</script>

<div class="app">
	<nav>
		<a class="wordmark" href="/">Loops</a>
		{#if data.self}
			<a href="/user/{data.self.id}" class="me">
				<img src={data.self.avatar} alt="" />
			</a>
		{/if}
	</nav>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.app {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-rows: auto 1fr;
		max-width: 80rem;
		margin-inline: auto;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.25rem 0.5rem;
		height: 3rem;
		.wordmark {
			text-decoration: none;
			color: inherit;
			font-weight: 800;
			font-size: 1.25rem;
		}
		.me {
			border-radius: 100%;
			overflow: hidden;
			width: 2rem;
			aspect-ratio: 1;
		}
	}
	.content {
		display: grid;
		padding: 0.25rem 0.5rem;
		overflow: hidden;
		overflow-y: auto;
	}
</style>
