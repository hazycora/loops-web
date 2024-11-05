import type { Account, Paginated } from '$lib/types'
import { json, error } from '@sveltejs/kit'

export async function GET({ params, fetch }) {
	const username = params.username

	// TODO: use a different username lookup method once one exists
	const accountsResponse = await fetch(`/api/v0/search?q=${encodeURIComponent(username)}`, { method: 'POST' })
	if (!accountsResponse.ok) {
		error(accountsResponse.status, 'Invalid response from Loops API')
	}

	const accounts = <Paginated<Account>>await accountsResponse.json()
	const account = accounts.data.find(account => account.username == username)

	if (!account) {
		error(404, 'could not find user')
	}

	return json(account)
}
