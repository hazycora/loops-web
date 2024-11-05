import type { Account, FollowState } from '$lib/types'
import { json, error } from '@sveltejs/kit'

const userNameIdMap = new Map<string, string>()

async function getAccountById(id: string, options: { fetch: typeof fetch }) {
	const { fetch } = options
	const accountResponse = await fetch(`/api/v0/user/id/${id}?ext=1`)
	if (!accountResponse.ok) {
		return null
	}
	return <{ data: Account; meta: FollowState }>await accountResponse.json()
}

// No API endpoint exists for this. This is a workaround.
async function getByUsername(
	username: string,
	options: {
		fetch: typeof fetch
	}
) {
	const { fetch } = options

	let accountId: string | undefined = undefined

	if (!userNameIdMap.has(username)) {
		const accountsResponse = await fetch(`https://loops.video/@${username}`)
		if (!accountsResponse.ok) {
			return null
		}

		const accountPageHtml = await accountsResponse.text()

		accountId = accountPageHtml.match(
			/<a href="loops:\/\/profile\/([0-9]+)"/
		)?.[1]
	} else {
		accountId = userNameIdMap.get(username)
	}

	if (!accountId) {
		return null
	}

	return getAccountById(accountId, { fetch })
}

export async function GET({ params, fetch }) {
	const username = params.username

	const account = await getByUsername(username, { fetch })

	if (!account) {
		error(404, 'could not find user')
	}

	userNameIdMap.set(username, account.data.id)

	return json(account)
}
