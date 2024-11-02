<script lang="ts">
	export let video
	export let active = false

	let videoElement: HTMLVideoElement

	$: {
		if (videoElement) {
			if (!active) {
				videoElement.pause()
			} else {
				videoElement.play()
			}
		}
	}
</script>

<div class="video">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		bind:this={videoElement}
		poster={video.media.thumbnail}
		autoplay={active}
	>
		<source src={video.media.src_url} />
	</video>
	<div class="details">
		<a href="/@{video.account.username}" class="author">
			<img src={video.account.avatar} alt="" class="avatar" />
			<span>@{video.account.username}</span>
		</a>
		<p class="caption">{video.caption}</p>
	</div>
</div>

<style lang="postcss">
	.video {
		scroll-snap-align: start;
		display: grid;
		> * {
			grid-area: 1 / 1;
		}
		aspect-ratio: 9/16;
		height: 100%;
		& video {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.details {
		position: relative;
		isolation: isolate;
		padding: 0.5rem;
		filter: drop-shadow(0 0 0.25rem rgb(0 0 0 / 0.5));
		&::before {
			display: block;
			position: absolute;
			inset-block: 0;
			inset-block-start: -1rem;
			inset-inline: 0;
			content: '';
			z-index: -1;
			background-image: linear-gradient(
				to bottom,
				transparent,
				rgb(0 0 0 / 0.25) 1rem
			);
		}
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
			border-radius: 100%;
		}
	}
	.caption {
		margin-block: 0;
		margin-block-start: 0.5rem;
	}
</style>
