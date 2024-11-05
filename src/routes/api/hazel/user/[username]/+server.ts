import type { Account, FollowState } from '$lib/types'
import { json, error } from '@sveltejs/kit'

const userNameIdMap = new Map<string, string>()

// No API endpoint exists for this. This is a workaround.
async function getByUsername(
	username: string,
	options: {
		fetch: typeof fetch
	}
) {
	const { fetch } = options
	const accountsResponse = await fetch(`https://loops.video/@${username}`)
	if (!accountsResponse.ok) {
		return null
	}
	const accountPageHtml = await accountsResponse.text()

	const accountId = accountPageHtml.match(
		/<a href="loops:\/\/profile\/([0-9]+)"/
	)?.[1]

	if (!accountId) {
		return null
	}

	const accountResponse = await fetch(`/api/v0/user/id/${accountId}?ext=1`)
	if (!accountResponse.ok) {
		return null
	}
	return <{ data: Account; meta: FollowState }>await accountResponse.json()
}

export async function GET({ params, fetch }) {
	const username = params.username

	if (userNameIdMap.has(username)) {
		const id = userNameIdMap.get(username)
		const accountResponse = await fetch(`/api/v0/user/id/${id}?ext=1`)
		if (!accountResponse.ok) {
			error(accountResponse.status, 'Failed to fetch user')
		}

		return json(await accountResponse.json())
	}

	const account = await getByUsername(username, { fetch })

	if (!account) {
		error(404, 'could not find user')
	}

	userNameIdMap.set(username, account.data.id)

	return json(account)
}
