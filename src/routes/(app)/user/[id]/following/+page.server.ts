import extendPaginated from '$lib/extendPaginated.js'

async function getAccount(id: string, options: { fetch: FetchFunction }) {
	const { fetch } = options
	const userResponse = await fetch(`/api/v0/user/id/${id}`)
	return <Account>await userResponse.json()
}

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
	const [accountData, accountFollowing] = await Promise.all([
		await getAccount(id, { fetch }),
		await getAccountFollowing(id, { fetch })
	])
	return {
		account: accountData,
		accounts: accountFollowing
	}
}
