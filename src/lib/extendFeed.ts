import { proxyApiUrl } from './proxyApiUrl'

export default async function extendFeed(
	feed: Feed,
	options: {
		fetch?: FetchFunction
		pages?: number
	} = { pages: 1 }
) {
	const pages = options.pages || 1
	const fetch = options.fetch || globalThis.fetch
	if (feed.links.next) {
		for (let i = 0; i < pages; i++) {
			const pageResponse = await fetch(proxyApiUrl(feed.links.next))
			if (!pageResponse.ok) {
				break
			}
			const page = <Feed>await pageResponse.json()
			feed.data.push(...page.data)
			feed.links.next = page.links.next
			feed.meta.next_cursor = page.meta.next_cursor
		}
	}
	return feed
}
