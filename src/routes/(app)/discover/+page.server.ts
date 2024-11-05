import type { Account, Paginated } from '$lib/types.js'
import { error } from '@sveltejs/kit'

export async function load({ fetch, url }) {
	const query = url.searchParams.get('q')

	let accounts: Paginated<Account> | undefined

	if (query) {
		const apiQuery = query.replace(/@/g, '')
		const searchResponse = await fetch(`/api/v0/search?q=${apiQuery}`, {
			method: 'POST'
		})
		if (!searchResponse.ok) {
			error(500, 'Failed to search for users')
		}
		accounts = <Paginated<Account>>await searchResponse.json()
	}

	return {
		query,
		accounts
	}
}
