<script>
	export let video
</script>

<div class="video">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video controls poster={video.media.thumbnail}>
		<source src={video.media.src_url} />
	</video>
	<p class="caption">{video.caption}</p>
	<a href="/@{video.account.username}" class="avatar">
		<img src={video.account.avatar} alt="" />
	</a>
</div>

<style lang="postcss">
	.video {
		width: 10rem;
		max-width: 100%;
		& video {
			width: 100%;
		}
	}
	p {
		margin: 0;
	}
	.avatar {
		display: block;
		width: 2rem;
		& img {
			width: 100%;
			border-radius: 100%;
		}
	}
</style>
