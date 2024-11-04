// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare module '*.svg?c' {
		import { ComponentType, SvelteComponent } from 'svelte'
		const icon: ComponentType<SvelteComponent>
		export default icon
	}
}

export {}
