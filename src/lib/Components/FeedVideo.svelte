<script lang="ts">
	import { Heart, ChatCircleText, DownloadSimple, Play } from 'phosphor-svelte'
	import IconButton from './IconButton.svelte'
	import { page } from '$app/stores'
	import type { Video } from '$lib/types'
	import { downloadVideo, toggleLikeVideo } from '$lib/videoActions'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let video: Video
	export let active = false

	const videoPanel = <Writable<Video | undefined>>getContext('videoPanel')

	let videoElement: HTMLVideoElement
	let paused: boolean

	$: {
		if (videoElement) {
			if (!active) {
				videoElement.pause()
			} else {
				videoElement.play()
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
		bind:paused
		poster={video.media.thumbnail}
		autoplay={active}
		loop
		playsInline
	>
		<source src={video.media.src_url} />
	</video>
	{#if paused || paused === undefined}
		<button class="play-button visible" on:click={playVideo}>
			<span class="sr-only">play</span>
			<Play aria-hidden="true" weight="fill" size="4rem" />
		</button>
	{:else}
		<button aria-label="pause" class="play-button" on:click={pauseVideo}
		></button>
	{/if}
	<div class="interface">
		<div class="details">
			<a href="/user/{video.account.id}" class="author">
				<img src={video.account.avatar} alt="" class="avatar" />
				<span>@{video.account.username}</span>
			</a>
			{#if video.caption}
				<button class="caption invisible-button" on:click={openPanel}>
					{video.caption}
				</button>
			{/if}
		</div>
		<div class="actions">
			<a href="/user/{video.account.id}">
				<img src={video.account.avatar} alt="" class="avatar" />
			</a>
			<IconButton
				disabled={!$page.data.self}
				on:click={async () => {
					video = await toggleLikeVideo(video)
				}}
				size="3rem"
				weight="regular"
				icon={Heart}
				label="like"
				filled={video.has_liked}
			/>
			<IconButton
				on:click={openPanel}
				size="3rem"
				weight="regular"
				icon={ChatCircleText}
				label="View comments"
			/>
			<IconButton
				on:click={() => downloadVideo(video)}
				size="3rem"
				weight="regular"
				icon={DownloadSimple}
				label="Download"
			/>
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
		filter: drop-shadow(0 0 0.5rem rgb(0 0 0 / 0.75))
			drop-shadow(0 0 0.125rem rgb(0 0 0 / 0.5));
	}
	.details {
		position: relative;
		isolation: isolate;
		padding: 1rem 0.5rem;
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
		font-size: 0.825rem;
		font-weight: 600;
		> img {
			display: block;
			width: 100%;
			aspect-ratio: 1;
			overflow: hidden;
			object-fit: cover;
			border-radius: 100%;
		}
	}
	.caption {
		margin-block: 0;
		margin-block-start: 0.5rem;

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
		gap: 0.5rem;
		padding-block: 0.5rem;
		padding-inline: 1rem;
		> * {
			width: 2.75rem;
		}
		.avatar {
			border-radius: 100%;
			width: 2.75rem;
			height: 2.75rem;
		}
	}
	@media not (max-width: 40rem) {
		.actions {
			display: none;
		}
	}
</style>
