import extendPaginated from '$lib/extendPaginated'

async function getAccount(id: string, options: { fetch: FetchFunction }) {
	const { fetch } = options
	const userResponse = await fetch(`/api/v0/user/id/${id}`)
	return <Account>await userResponse.json()
}

async function getAccountFollowers(
	id: string,
	options: { fetch: FetchFunction }
) {
	const { fetch } = options
	const userFollowersResponse = await fetch(`/api/v0/user/followers/byId/${id}`)
	const followers = <Paginated<Account>>await userFollowersResponse.json()
	return extendPaginated(followers, { fetch, pages: 2 })
}

export async function load({ fetch, params }) {
	const id = params.id
	const [accountData, accountFollowers] = await Promise.all([
		await getAccount(id, { fetch }),
		await getAccountFollowers(id, { fetch })
	])
	return {
		account: accountData,
		accounts: accountFollowers
	}
}
