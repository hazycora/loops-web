import extendPaginated from '$lib/extendPaginated.js'

async function getAccountFollowing(
	id: string,
	options: { fetch: FetchFunction }
) {
	const { fetch } = options
	const userFollowingResponse = await fetch(`/api/v0/user/following/byId/${id}`)
	const following = <Paginated<Account>>await userFollowingResponse.json()
	return extendPaginated(following, { fetch, pages: 2 })
}

export async function load({ fetch, params }) {
	const id = params.id
	const accountFollowing = await getAccountFollowing(id, {
		fetch
	})
	return {
		accounts: accountFollowing
	}
}
