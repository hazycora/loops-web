import type { Account, FollowState } from '$lib/types'

async function getAccount(username: string, options: { fetch: typeof fetch }) {
	const { fetch } = options
	const userResponse = await fetch(`/api/v0/user/username/${username}?ext=1`)
	return <{ data: Account; meta: FollowState }>await userResponse.json()
}

export async function load({ fetch, params }) {
	const username = params.username
	const { data: account, meta: followState } = await getAccount(username, {
		fetch
	})
	return {
		account,
		followState
	}
}
