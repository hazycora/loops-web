import type { Feed } from '$lib/types'

export async function load({ fetch, url }) {
	const cursor = url.searchParams.get('cursor')
	const feedUrl = cursor
		? `/api/v0/feed/following?cursor=${cursor}`
		: '/api/v0/feed/following'
	const feedResponse = await fetch(feedUrl)
	const feedData = <Feed>await feedResponse.json()
	return {
		feed: feedData
	}
}
