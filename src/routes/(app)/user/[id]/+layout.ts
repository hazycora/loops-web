import extendPaginated from '$lib/extendPaginated.js'

async function getAccount(id: string, options: { fetch: FetchFunction }) {
	const { fetch } = options
	const userResponse = await fetch(`/api/v0/user/id/${id}?ext=1`)
	return <{ data: Account; meta: FollowState }>await userResponse.json()
}

export async function load({ fetch, params }) {
	const id = params.id
	const { data: account, meta: followState } = await getAccount(id, { fetch })
	return {
		account,
		followState
	}
}
