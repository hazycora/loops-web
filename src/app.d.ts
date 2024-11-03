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

	type FetchFunction = (
		input: RequestInfo | URL,
		init?: RequestInit
	) => Promise<Response>

	interface Paginated<Type> {
		data: Type[]
		links: Links
		meta
	}

	type Feed = Paginated<Video>

	interface Video {
		id: string
		account: Account
		caption?: string
		url: string
		is_owner: boolean
		is_sensitive: boolean
		media: Media
		likes: number
		shares: number
		comments: number
		has_liked: boolean
	}

	interface Account {
		id: string
		name: string
		avatar: string
		username: string
		is_owner: boolean
		bio?: string
		post_count: number
		follower_count: number
		following_count: number
		url: string
		is_blocking: boolean
		created_at: string
	}

	interface Media {
		width: number
		height: number
		thumbnail: string
		src_url: string
	}

	interface Links {
		first: unknown
		last: unknown
		prev: unknown
		next: string
	}

	interface Meta {
		path: string
		per_page: number
		next_cursor: string
		prev_cursor: string
	}

	declare module '*.svg?c' {
		import { ComponentType, SvelteComponent } from 'svelte'
		const icon: ComponentType<SvelteComponent>
		export default icon
	}
}

export {}
