import type { Account, Paginated } from '$lib/types.js'
import { error } from '@sveltejs/kit'

export async function load({ fetch, url }) {
	const query = url.searchParams.get('q') ?? ''
	const apiQuery = query.replace(/@/g, '')

	if (!apiQuery) {
		return { query }
	}

	const searchResponse = await fetch(`/api/hazel/user/search?q=${apiQuery}`)
	if (!searchResponse.ok) {
		error(500, 'Failed to search for users')
	}
	const accounts = <Paginated<Account>>await searchResponse.json()

	return {
		query,
		accounts
	}
}
