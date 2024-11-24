import extendPaginated from '$lib/extendPaginated.js'
import type { Feed, Video } from '$lib/types'
import { base64ToId, idToBase64 } from '$lib/utils/base64id.js'
import { error, redirect } from '@sveltejs/kit'

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
	let id = params.id

	// if we moved slower we could've used base64 from the jump, but we didn't know that's how the site was gonna work. now we need to support both.
	// or we could just break old video URLs, but that's not very nice.
	//
	// dunno how long the snowflakes are capable of being when they're turned into decimal integers, so let's just assume
	// 12 characters is shorter than the smallest possible snowflake?

	if (/[a-zA-Z-_]/.test(id) || id.length <= 12) {
		id = base64ToId(id)
	} else {
		const base64Id = idToBase64(id)
		redirect(308, `/v/${base64Id}`)
	}

	return await loadVideoWithContext(id, { fetch })
}
