<script lang="ts">
	// Copied from https://github.com/imputnet/cobalt, adapted to be portable
	import { onMount } from 'svelte'

	// please add a source link (https://github.com/imputnet/cobalt) if you use this implementation
	// i spent 4 hours switching between simulators and devices to get the best way to do this

	$: safeAreaTop = 0
	$: safeAreaBottom = 0
	$: state = 'hidden' // "notch", "island", "notch x"

	const islandValues = [
		53, // 16 pro max: larger text
		59, // regular & plus: default
		48, // regular: larger text
		49, // 16: larger text
		51, // plus only: larger text
		62 // 16: regular
	]

	const xNotch = [44]

	const getSafeAreaTop = () => {
		const root = document.documentElement
		return getComputedStyle(root)
			.getPropertyValue('--safe-area-inset-top')
			.trim()
	}

	const getSafeAreaBottom = () => {
		const root = document.documentElement
		return getComputedStyle(root)
			.getPropertyValue('--safe-area-inset-bottom')
			.trim()
	}

	onMount(() => {
		safeAreaTop = Number(getSafeAreaTop().replace('px', ''))
		safeAreaBottom = Number(getSafeAreaBottom().replace('px', ''))
	})

	$: if (safeAreaTop > 20) {
		state = 'notch'
		if (islandValues.includes(safeAreaTop)) {
			state = 'island'
		}
		if (xNotch.includes(safeAreaTop)) {
			state = 'notch x'
		}
		// exception for XR and 11 at regular screen zoom
		if (safeAreaTop === 48 && safeAreaBottom === 34) {
			state = 'notch'
		}

		// exception for iPhone 16 Pro Max
		if (safeAreaTop === 53 && safeAreaBottom === 29) {
			state = 'notch sixteen-pro-max'
		}
	}
</script>

{#if true}
	<div id="cobalt-notch-sticker" aria-hidden="true" class={state}>
		<div>
			<span>Loops<span class="gay">.gay</span></span>
		</div>
	</div>
{/if}

<style lang="postcss">
	:global(:root) {
		--safe-area-inset-top: env(safe-area-inset-top);
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
	}

	#cobalt-notch-sticker {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 999;
	}

	#cobalt-notch-sticker > div {
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-clr);
		background-color: black;
		border-radius: 0.625rem;
		padding: 0.125rem 0.25rem;
		display: grid;
		place-items: center;
		span {
			height: auto;
			display: inline-block;
			width: fit-content;
		}
		.gay {
			height: auto;
			color: transparent;
			background: linear-gradient(
				45deg in hsl,
				hsl(359deg, 70%, 75%),
				hsl(180deg, 70%, 75%),
				hsl(0deg, 70%, 75%)
			);
			background-clip: text;
			-webkit-background-clip: text;
		}
	}

	#cobalt-notch-sticker.island {
		padding-top: 15px;
	}

	#cobalt-notch-sticker.notch {
		padding-top: 2px;
	}

	#cobalt-notch-sticker.sixteen-pro-max {
		padding-top: 12px;
	}

	#cobalt-notch-sticker.notch.x :global(*) {
		height: 28px;
	}

	#cobalt-notch-sticker :global(*) {
		width: 100px;
		height: 30px;
	}

	/* regular iphone size, larger text display mode */
	@media screen and (max-width: 350px) {
		#cobalt-notch-sticker.notch :global(*) {
			height: 24px;
		}

		#cobalt-notch-sticker.island {
			padding-top: 9px;
		}
	}

	/* regular & plus iphone size, dynamic island, larger text display mode */
	@media screen and (max-width: 375px) {
		#cobalt-notch-sticker.island :global(*) {
			height: 26px;
		}

		#cobalt-notch-sticker.island {
			padding-top: 11px;
		}
	}

	@media screen and (orientation: landscape) {
		#cobalt-notch-sticker {
			display: none;
		}
	}
</style>
