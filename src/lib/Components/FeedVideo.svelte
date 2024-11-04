<script lang="ts">
	import { Heart, DownloadSimple, Play } from 'phosphor-svelte'
	import IconButton from './IconButton.svelte'
	import { page } from '$app/stores'
	import type { Video } from '$lib/types'
	import { mobile } from '$lib/stores'
	import { downloadVideo, likeVideo } from '$lib/videoActions'

	export let video: Video
	export let active = false

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

	function playVideo() {
		videoElement.play()
	}

	function pauseVideo() {
		videoElement.pause()
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
			<Play weight="fill" size="4rem" />
		</button>
	{:else}
		<button class="play-button" on:click={pauseVideo}></button>
	{/if}
	<div class="interface">
		<div class="details">
			<a href="/user/{video.account.id}" class="author">
				<img src={video.account.avatar} alt="" class="avatar" />
				<span>@{video.account.username}</span>
			</a>
			{#if video.caption}
				<p class="caption">{video.caption}</p>
			{/if}
		</div>
		{#if $mobile}
			<div class="actions">
				<a href="/user/{video.account.id}">
					<img src={video.account.avatar} alt="" class="avatar" />
				</a>
				<IconButton
					disabled={!$page.data.self}
					on:click={() => likeVideo(video)}
					size="3rem"
					weight="regular"
					icon={Heart}
					label="like"
					filled={video.has_liked}
				/>
				<IconButton
					on:click={() => downloadVideo(video)}
					size="3rem"
					weight="regular"
					icon={DownloadSimple}
					label="Download"
				/>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.video {
		scroll-snap-align: start;
		display: grid;
		> * {
			grid-area: 1 / 1;
		}
		height: 100%;
		& video {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			overflow: hidden;
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
		}
	}
</style>
