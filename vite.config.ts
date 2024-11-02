import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import svelteSVG from '@hazycora/vite-plugin-svelte-svg'

export default defineConfig({
	plugins: [
		svelteSVG({
			svgoConfig: {
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
								cleanupIds: false
							}
						}
					}
				]
			},
			requireSuffix: true
		}),
		sveltekit()
	]
})
