import { redirect } from '@sveltejs/kit'

export async function load({ fetch, url, cookies }) {
	const cursor = url.searchParams.get('cursor')
	const token = cookies.get('token')
	if (!token) {
		redirect(307, '/')
	}
	const feedUrl = cursor
		? `/api/v0/feed/for-you?cursor=${cursor}`
		: '/api/v0/feed/for-you'
	const feedResponse = await fetch(feedUrl, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	const feedData = <
		{
			data: Video[]
			links: Links
			meta: Meta
		}
	>await feedResponse.json()
	return {
		feed: feedData
	}
}
