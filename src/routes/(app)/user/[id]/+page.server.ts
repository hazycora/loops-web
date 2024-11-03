import extendFeed from '$lib/extendFeed.js'

async function getAccount(id: string, options: { fetch: FetchFunction }) {
	const { fetch } = options
	const userResponse = await fetch(`/api/v0/user/id/${id}`)
	return <Account>await userResponse.json()
}

async function getAccountFeed(id: string, options: { fetch: FetchFunction }) {
	const { fetch } = options
	const userVideosResponse = await fetch(`/api/v0/user/videos/${id}`)
	const feed = <Feed>await userVideosResponse.json()
	return await extendFeed(feed, { fetch, pages: 1 })
}

export async function load({ fetch, params }) {
	const id = params.id
	const [accountData, accountVideos] = await Promise.all([
		await getAccount(id, { fetch }),
		await getAccountFeed(id, { fetch })
	])
	return {
		account: accountData,
		feed: accountVideos
	}
}
