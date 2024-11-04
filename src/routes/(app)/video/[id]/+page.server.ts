import extendPaginated from '$lib/extendPaginated.js'
import type { Feed, Video } from '$lib/types'
import { error } from '@sveltejs/kit'

async function loadVideoWithContext(
	id: string,
	options: { fetch: typeof fetch }
) {
	const fetch = options.fetch
	const videoResponse = await fetch(`/api/v0/video/id/${id}`)
	if (!videoResponse.ok) {
		const { message } = await videoResponse.json()
		error(500, message)
	}
	const video = <Video>await videoResponse.json()
	const accountFeedResponse = await fetch(
		`/api/v0/user/videos/${video.account.id}`
	)
	let accountFeed = <Feed>await accountFeedResponse.json()
	let accountFeedIndex = accountFeed.data.findIndex(v => v.id === video.id)
	let attempts = 0
	// TODO: refactor once API makes this easier
	while (accountFeedIndex === -1 && attempts < 5) {
		accountFeed = await extendPaginated(accountFeed, { fetch })
		accountFeedIndex = accountFeed.data.findIndex(v => v.id === video.id)
		attempts++
	}
	return {
		video,
		accountFeed,
		accountFeedIndex
	}
}

export async function load({ fetch, params }) {
	const id = params.id
	return await loadVideoWithContext(id, { fetch })
}
