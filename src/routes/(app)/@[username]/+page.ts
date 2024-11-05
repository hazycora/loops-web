import extendPaginated from '$lib/extendPaginated'
import type { Feed } from '$lib/types'

async function getAccountFeed(id: string, options: { fetch: typeof fetch }) {
	const { fetch } = options
	const userVideosResponse = await fetch(`/api/v0/user/videos/${id}`)
	const feed = <Feed>await userVideosResponse.json()
	return await extendPaginated(feed, { fetch, pages: 1 })
}

export async function load({ parent, fetch }) {
	const layoutData = await parent()
	const id = layoutData.account.id
	const feed = await getAccountFeed(id, { fetch })
	return {
		feed
	}
}
