import { proxyApiUrl } from './proxyApiUrl'
import type { Paginated } from './types'

export default async function extendPaginated<T>(
	feed: Paginated<T>,
	options: {
		fetch?: typeof fetch
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
			const page = <Paginated<T>>await pageResponse.json()
			feed.data.push(...page.data)
			feed.links.next = page.links.next
			feed.meta.next_cursor = page.meta.next_cursor
		}
	}
	return feed
}
