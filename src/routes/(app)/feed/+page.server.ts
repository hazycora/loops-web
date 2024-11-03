export async function load({ fetch, url }) {
	const cursor = url.searchParams.get('cursor')
	const feedUrl = cursor
		? `/api/v0/feed/for-you?cursor=${cursor}`
		: '/api/v0/feed/for-you'
	const feedResponse = await fetch(feedUrl)
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
