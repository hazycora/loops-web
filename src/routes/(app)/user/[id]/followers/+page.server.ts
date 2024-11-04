import extendPaginated from '$lib/extendPaginated'
import type { Account, Paginated } from '$lib/types'

async function getAccountFollowers(
	id: string,
	options: { fetch: typeof fetch }
) {
	const { fetch } = options
	const userFollowersResponse = await fetch(`/api/v0/user/followers/byId/${id}`)
	const followers = <Paginated<Account>>await userFollowersResponse.json()
	return extendPaginated(followers, { fetch, pages: 2 })
}

export async function load({ fetch, params }) {
	const id = params.id
	const accountFollowers = await getAccountFollowers(id, {
		fetch
	})
	return {
		accounts: accountFollowers
	}
}
