import type { Feed } from '$lib/types'

export async function load({ fetch, url }) {
	const cursor = url.searchParams.get('cursor')
	const feedUrl = cursor
		? `/api/v0/feed/for-you?cursor=${cursor}`
		: '/api/v0/feed/for-you'
	const feedResponse = await fetch(feedUrl)
	const feedData = <Feed>await feedResponse.json()
	return {
		feed: feedData
	}
}
