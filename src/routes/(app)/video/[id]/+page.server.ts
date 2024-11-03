import extendFeed from '$lib/extendFeed.js'
import { redirect } from '@sveltejs/kit'

async function loadVideoWithContext(
	id: string,
	options: { fetch: FetchFunction }
) {
	const fetch = options.fetch
	const videoResponse = await fetch(`/api/v0/video/id/${id}`)
	const video = <Video>await videoResponse.json()
	const accountFeedResponse = await fetch(
		`/api/v0/user/videos/${video.account.id}`
	)
	let accountFeed = <Feed>await accountFeedResponse.json()
	let accountFeedIndex = accountFeed.data.findIndex(v => v.id === video.id)
	let attempts = 0
	// TODO: refactor once API makes this easier
	while (accountFeedIndex === -1 && attempts < 5) {
		accountFeed = await extendFeed(accountFeed, { fetch })
		accountFeedIndex = accountFeed.data.findIndex(v => v.id === video.id)
		attempts++
	}
	return {
		video,
		accountFeed,
		accountFeedIndex
	}
}

export async function load({ fetch, params, cookies }) {
	const id = params.id
	return await loadVideoWithContext(id, { fetch })
}
