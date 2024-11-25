<script lang="ts">
	import { Heart, DownloadSimple, Play, ChatDots } from 'phosphor-svelte'
	import IconButton from './IconButton.svelte'
	import { page } from '$app/stores'
	import type { Video } from '$lib/types'
	import { downloadVideo, toggleLikeVideo } from '$lib/videoActions'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import { fade, scale } from 'svelte/transition'

	export let video: Video
	export let active = false

	const videoPanel = <Writable<Video | undefined>>getContext('videoPanel')

	let videoElement: HTMLVideoElement
	let paused: boolean

	let ready = false
	let currentTime: number
	let duration: number

	let videoWidth = 720
	let videoHeight = 1280

	$: videoIsPortrait = videoHeight > videoWidth * 1.75

	$: {
		if (videoElement) {
			ready = false
			if (!active) {
				videoElement.pause()
				videoElement.currentTime = 0
			} else {
				videoElement.play()
				ready = true
			}
		}
	}

	$: {
		if ($videoPanel) {
			videoElement.pause()
		}
	}

	function playVideo() {
		videoElement.play()
	}

	function pauseVideo() {
		videoElement.pause()
	}

	function openPanel() {
		videoPanel.set(video)
	}
</script>

<div class="video">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		bind:this={videoElement}
		bind:currentTime
		bind:duration
		bind:paused
		bind:videoWidth
		bind:videoHeight
		poster={video.media.thumbnail}
		autoplay={active}
		loop
		playsInline
		class:is-portrait={videoIsPortrait}
	>
		<source src={video.media.src_url} />
	</video>
	{#if ready}
		{#if paused || paused === undefined}
			<button
				transition:fade={{ duration: 150 }}
				class="play-button visible"
				on:click={playVideo}
			>
				<span class="sr-only">play</span>
				<div transition:scale={{ duration: 250, start: 0.9 }}>
					<Play aria-hidden="true" weight="fill" size="4rem" />
				</div>
			</button>
		{:else}
			<button aria-label="pause" class="play-button" on:click={pauseVideo}
			></button>
		{/if}
	{/if}
	<div class="interface">
		<div class="details">
			<a href="/@{video.account.username}" class="author">
				{video.account.name}
			</a>
			{#if video.caption}
				<button class="caption invisible-button" on:click={openPanel}>
					{video.caption}
				</button>
			{/if}
		</div>
		<div class="actions">
			<a href="/@{video.account.username}">
				<img src={video.account.avatar} alt="" class="avatar" />
			</a>
			<IconButton
				disabled={!$page.data.self}
				on:click={async () => {
					video = await toggleLikeVideo(video)
				}}
				size="2.5rem"
				weight="regular"
				icon={Heart}
				label="Like this video along with {video.likes} others"
				visualLabel={video.likes.toString()}
				filled
				color={video.has_liked ? 'var(--favourite-clr)' : undefined}
			/>
			<IconButton
				on:click={openPanel}
				size="2.5rem"
				weight="regular"
				icon={ChatDots}
				label="View {video.comments.toString()} comments"
				visualLabel={video.comments.toString()}
				filled
			/>
			<IconButton
				on:click={() => downloadVideo(video)}
				size="2.5rem"
				weight="regular"
				icon={DownloadSimple}
				label="Download video"
				filled
			/>
		</div>
		<div class="progress" aria-hidden="true">
			<div
				class="bar"
				style:width="{((currentTime ?? 0) / (duration ?? 0)) * 100}%"
			></div>
		</div>
	</div>
</div>

<style lang="postcss">
	.video {
		scroll-snap-align: start;
		scroll-snap-stop: always;
		display: grid;
		> * {
			grid-area: 1 / 1;
		}
		height: 100%;
		min-height: 0;
		& video {
			max-width: 100%;
			max-height: 100%;
			object-fit: cover;
			object-position: center;
			overflow: hidden;

			place-self: center;

			@media (max-width: 40rem) {
				&.is-portrait {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.interface {
		pointer-events: none;
		> * {
			pointer-events: auto;
		}
		z-index: 900;
		display: grid;
		grid-template-columns: 1fr 4rem;
		grid-template-rows: 1fr auto;
		filter: drop-shadow(0 0 0.5rem rgb(0 0 0 / 0.75))
			drop-shadow(0 0 0.125rem rgb(0 0 0 / 0.5));
	}
	.details {
		position: relative;
		isolation: isolate;
		padding: 0.75rem 0.5rem;
		height: min-content;
		align-self: end;
		min-width: 0;
	}
	.author {
		display: grid;
		grid-template-columns: 1.75rem 1fr;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		text-decoration: none;
		width: fit-content;
		font-size: 1rem;
		font-weight: 700;
	}
	.caption {
		margin-block: 0;
		margin-block-start: 0.625rem;

		max-width: 100%;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
	}
	.play-button {
		color: inherit;
		background: none;
		border: none;
		z-index: 100;
		&.visible {
			background-color: rgb(0 0 0 / 0.5);
		}
	}
	.actions {
		align-self: end;
		height: min-content;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		gap: 0.125rem;
		padding-block: 0.75rem;
		width: 3.625rem;
		.avatar {
			border-radius: 100%;
			width: 2.875rem;
			height: 2.875rem;
			outline: 2px solid white;
			outline-offset: -1px;
			margin-block-end: 0.75rem;
		}
	}
	.progress {
		height: 0.125rem;
		grid-column: 1 / -1;
		.bar {
			width: 0;
			height: 100%;
			background-color: var(--text-clr);
		}
	}
	@media not (max-width: 40rem) {
		.actions {
			display: none;
		}
	}
</style>
