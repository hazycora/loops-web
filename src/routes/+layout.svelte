<script lang="ts">
	import '../app.pcss'
	import type { Account, Video } from '$lib/types'
	import { House, User } from 'phosphor-svelte'
	import { page } from '$app/stores'

	import { onMount, setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import VideoInfo from '$lib/Components/VideoInfo.svelte'
	import { fade, fly } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import Button from '$lib/Components/Button.svelte'

	const videoPanel = writable<Video | undefined>(undefined)
	setContext('videoPanel', videoPanel)

	let videoPanelElement: HTMLElement | null = null

	$: self = <Account>$page.data.self

	function onPanelClick(event: Event) {
		if (event.target == videoPanelElement) {
			videoPanel.set(undefined)
		}
	}

	function onPanelKeydown(event: KeyboardEvent) {
		if (!$videoPanel) return
		if (event.key == 'Escape') {
			videoPanel.set(undefined)
		}
	}

	onMount(() => {
		window.addEventListener('keydown', onPanelKeydown)
		return () => {
			window.removeEventListener('keydown', onPanelKeydown)
		}
	})
</script>

<div class="app">
	<nav class="logged-out" class:desktop={self}>
		<a class="wordmark" href="/">Loops</a>
		{#if self}
			<a href="/user/{self.id}" class="me">
				<img src={self.avatar} alt="" />
			</a>
		{:else}
			<Button href="/" text="Log in" />
		{/if}
	</nav>
	<div class="content">
		<main>
			<slot />
		</main>
		{#if self}
			<nav class="mobile">
				<a href="/feed" class:active={$page.url.pathname == '/feed'}>
					<House size="2rem" />
					<span class="label">Feed</span>
				</a>
				<a
					href="/user/{self.id}"
					class:active={$page.url.pathname.startsWith(`/user/${self.id}`)}
				>
					<User size="2rem" />
					<span class="label">Profile</span>
				</a>
			</nav>
		{/if}
	</div>
</div>

{#if $videoPanel}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		bind:this={videoPanelElement}
		transition:fade={{ duration: 400, easing: cubicOut }}
		class="panel"
		on:click={onPanelClick}
	>
		<div
			transition:fly={{ y: '100vh', duration: 200, easing: cubicOut }}
			class="info"
		>
			<VideoInfo video={$videoPanel} />
		</div>
	</div>
{/if}

<style lang="postcss">
	.app {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-rows: auto 1fr;
		@media (max-width: 40rem) {
			grid-template-rows: 1fr auto;
		}
		max-width: 80rem;
		margin-inline: auto;
	}
	nav.desktop,
	nav.logged-out {
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
		grid-template-rows: 1fr auto;
		main {
			min-height: 0;
		}
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

	.panel {
		z-index: 9999;
		position: fixed;
		inset: 0;
		display: grid;
		align-items: end;
		backdrop-filter: blur(0.5rem);
		background-color: rgb(0 0 0 / 0.5);
		.info {
			background-color: black;
			overflow: hidden;
			border-start-start-radius: 0.5rem;
			border-start-end-radius: 1rem;
			height: 75%;
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
		}
		main {
			padding: 0.25rem 0.5rem;
			overflow: hidden;
			overflow-y: auto;
		}
	}

	@media not (max-width: 40rem) {
		nav.mobile {
			display: none;
		}
	}
</style>
