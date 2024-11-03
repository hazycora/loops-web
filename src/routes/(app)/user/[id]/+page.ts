import extendPaginated from '$lib/extendPaginated'

async function getAccountFeed(id: string, options: { fetch: FetchFunction }) {
	const { fetch } = options
	const userVideosResponse = await fetch(`/api/v0/user/videos/${id}`)
	const feed = <Feed>await userVideosResponse.json()
	return await extendPaginated(feed, { fetch, pages: 1 })
}

export async function load({ fetch, params }) {
	const id = params.id
	const feed = await getAccountFeed(id, { fetch })
	return {
		feed
	}
}
