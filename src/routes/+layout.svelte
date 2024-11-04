<script lang="ts">
	import '../app.pcss'
	import type { Account } from '$lib/types'
	import { House, User } from 'phosphor-svelte'
	import { page } from '$app/stores'

	export let data: { self?: Account }

	$: isFeed = $page.route.id == '/(app)/feed'
</script>

<div class="app">
	<nav class="desktop">
		<a class="wordmark" href="/">Loops</a>
		{#if data.self}
			<a href="/user/{data.self.id}" class="me">
				<img src={data.self.avatar} alt="" />
			</a>
		{/if}
	</nav>
	<div class="content">
		{#if isFeed}
			<slot />
		{:else}
			<main>
				<slot />
			</main>
		{/if}
		{#if $page.data.self}
			<nav class="mobile">
				<a href="/feed" class:active={$page.url.pathname == '/feed'}>
					<House size="2rem" />
					<span class="label">Feed</span>
				</a>
				<a
					href="/user/{$page.data.self.id}"
					class:active={$page.url.pathname.startsWith(
						`/user/${$page.data.self.id}`
					)}
				>
					<User size="2rem" />
					<span class="label">Profile</span>
				</a>
			</nav>
		{/if}
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
	nav.desktop {
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

	nav.mobile {
		padding: 0.25rem;
		width: 100%;
		display: flex;
		justify-content: space-around;
		a {
			width: 100%;
			color: inherit;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			.label {
				font-size: 0.75rem;
			}
		}
		.active {
			color: var(--primary-clr);
		}
	}

	@media (max-width: 40rem) {
		nav.desktop {
			display: none;
		}
		.content {
			padding: 0;
			grid-template-rows: 1fr auto;
			height: 100%;
			height: 100vh;
			height: 100svh;
		}
		main {
			padding: 0.25rem 0.5rem;
			overflow: hidden;
			overflow-y: auto;
		}
	}
</style>
