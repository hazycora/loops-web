<script lang="ts">
	import '../app.pcss'
	import type { Account, Video } from '$lib/types'
	import {
		MagnifyingGlass,
		House,
		Compass,
		UploadSimple,
		Bell,
		User
	} from 'phosphor-svelte'
	import { page } from '$app/stores'

	import { onMount, setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import VideoInfo from '$lib/Components/VideoInfo.svelte'
	import { fade, fly } from 'svelte/transition'
	import { expoIn, expoOut } from 'svelte/easing'
	import Button from '$lib/Components/Button.svelte'
	import { onNavigate } from '$app/navigation'
	import { mobile } from '$lib/stores'
	import NotchSticker from '$lib/Components/NotchSticker.svelte'
	import device from '$lib/device'

	const videoPanel = writable<Video | undefined>(undefined)
	setContext('videoPanel', videoPanel)

	let videoPanelElement: HTMLElement | null = null

	$: self = <Account>$page.data.self

	$: isVideoPage =
		$page.url.pathname.startsWith('/v/') ||
		$page.url.pathname.startsWith('/feed')

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

	onNavigate(() => {
		videoPanel.set(undefined)
	})

	onMount(() => {
		window.addEventListener('keydown', onPanelKeydown)
		return () => {
			window.removeEventListener('keydown', onPanelKeydown)
		}
	})
</script>

{#if $page.data.self && device.iPhone && device.installed}
	<NotchSticker />
{/if}

<div class="app">
	<nav class="logged-out" class:desktop={self}>
		<a class="wordmark" href="/">Loops</a>
		<div class="actions">
			<a href="/discover">
				<MagnifyingGlass weight="bold" size="1.5rem" />
			</a>
			{#if self}
				<a href="/notifications">
					<Bell weight="bold" size="1.5rem" />
				</a>
				<a href="/@{self.username}" class="me">
					<img src={self.avatar} alt="" />
				</a>
			{:else}
				<Button href="/" text="Log in" />
			{/if}
		</div>
	</nav>
	<div class="content" class:video-page={isVideoPage}>
		<div class="page-root">
			<slot />
		</div>
		{#if self}
			<nav class="mobile">
				<a href="/feed" class:active={$page.url.pathname.startsWith('/feed')}>
					<House weight="fill" size="2rem" />
					<span class="label">Feed</span>
				</a>
				<a href="/discover" class:active={$page.url.pathname == '/discover'}>
					<Compass weight="fill" size="2rem" />
					<span class="label">Discover</span>
				</a>
				<a href="/upload" class:active={$page.url.pathname == '/upload'}>
					<UploadSimple weight="fill" size="2rem" />
					<span class="label">Upload</span>
				</a>
				<a
					href="/notifications"
					class:active={$page.url.pathname == '/notifications'}
				>
					<Bell weight="fill" size="2rem" />
					<span class="label">Notifications</span>
				</a>
				<a
					href="/@{self.username}"
					class:active={$page.url.pathname.startsWith(`/@${self.username}`)}
				>
					<User weight="fill" size="2rem" />
					<span class="label">Profile</span>
				</a>
			</nav>
		{/if}
	</div>
</div>

{#if $mobile && $videoPanel}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		bind:this={videoPanelElement}
		in:fade={{ duration: 600, easing: expoOut }}
		out:fade={{ duration: 300, easing: expoIn }}
		class="panel"
		on:click={onPanelClick}
	>
		<div
			in:fly={{ y: '100vh', duration: 400, easing: expoOut }}
			out:fly={{ y: '100vh', duration: 200, easing: expoIn }}
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
		&:has(nav.desktop) {
			@media (max-width: 40rem) {
				grid-template-rows: 1fr auto;
			}
		}
		max-width: 80rem;
		margin-inline: auto;
	}
	nav.desktop,
	nav.logged-out {
		background-color: rgb(0 0 0 / 0.75);
		backdrop-filter: blur(10px);
		border-block-end: 1px solid var(--border-clr);
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.25rem 0.5rem;
		padding-block-start: calc(env(safe-area-inset-top) + 0.25rem);
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
		.actions {
			height: 100%;
			display: flex;
			gap: 0.75rem;
			align-items: center;
			a {
				padding: 0.25rem;
				height: 2rem;
				width: 2rem;
				color: inherit;
				text-decoration: none;
			}
		}
	}
	.content {
		display: grid;
		padding: 0.25rem 0.5rem;
		@media (max-width: 40rem) {
			overflow: hidden;
			overflow-y: auto;
		}
		&.video-page {
			overflow: hidden;
			overflow-y: auto;
		}
		grid-template-rows: 1fr auto;
		.page-root {
			min-height: 0;
		}
	}

	nav.mobile {
		padding: 0.5rem 0.25rem;
		width: 100%;
		display: flex;
		justify-content: space-around;
		border-block-start: 1px solid var(--border-clr);
		padding-block-end: calc(env(safe-area-inset-bottom) + 0.25rem);
		a {
			width: 100%;
			color: inherit;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			.label {
				font-size: 0.625rem;
				font-weight: 600;
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
			box-shadow: 0 0 1rem 0.25rem rgb(0 0 0 / 0.5);
			background-color: var(--bg-clr);
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
		.page-root {
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
