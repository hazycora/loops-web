<script lang="ts">
	import type { Feed } from '$lib/types'

	export let feed: Feed
</script>

<div class="videos">
	{#each feed.data as video}
		<a href="/v/{video.id}" class="thumbnail">
			<img src={video.media.thumbnail} alt="" draggable="false" />
			{#if video.caption}
				<span class="caption">{video.caption}</span>
			{/if}
		</a>
	{/each}
</div>

<style lang="postcss">
	.videos {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
		gap: 0.5rem;
	}

	.thumbnail {
		display: grid;
		width: 100%;
		aspect-ratio: 9 / 16;
		overflow: hidden;
		border-radius: 0.5rem;
		text-decoration: none;
		color: inherit;

		> * {
			grid-area: 1 / -1;
		}
		img {
			user-select: none;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.caption {
			user-select: none;
			position: relative;
			isolation: isolate;
			height: fit-content;
			align-self: end;
			padding: 0.25rem;
			filter: drop-shadow(0 0 0.25rem rgb(0 0 0 / 0.5));
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;

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
		}
	}
</style>
