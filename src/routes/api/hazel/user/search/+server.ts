import extendPaginated from '$lib/extendPaginated.js'
import type { Account, Paginated } from '$lib/types.js'
import { error, json } from '@sveltejs/kit'

async function searchUsers(query: string, options: { fetch: typeof fetch }) {
	const { fetch } = options
	const apiQuery = query.replace(/@/g, '')
	const searchResponse = await fetch(`/api/v0.5/search/users?q=${apiQuery}`, {
		method: 'POST'
	})
	if (!searchResponse.ok) {
		error(500, 'Failed to search for users')
	}
	return <Paginated<Account>>await searchResponse.json()
}

async function getByUsername(
	username: string,
	options: { fetch: typeof fetch }
) {
	const { fetch } = options
	const response = await fetch(`/api/hazel/user/byUsername/${username}`)
	if (!response.ok) {
		return null
	}
	const { data: account } = <{ data: Account }>await response.json()
	return account
}

export async function GET({ fetch, url }) {
	const query = url.searchParams.get('q')

	if (!query) {
		return error(400, 'missing query')
	}

	const accounts = await extendPaginated(await searchUsers(query, { fetch }), {
		fetch
	})

	// TODO: because we're adding the exact match to the front of the list, there's a chance there are duplicates.
	// This is a temporary fix until the Loops API is updated to return the exact match first.
	let exactMatch = accounts.data.find(account => account.username === query)
	if (!exactMatch) {
		exactMatch = (await getByUsername(query, { fetch })) ?? undefined
		if (exactMatch) {
			accounts.data = [exactMatch, ...accounts.data]
		}
	}

	return json(accounts)
}
