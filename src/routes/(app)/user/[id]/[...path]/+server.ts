import type { Account } from '$lib/types'
import { redirect } from '@sveltejs/kit'

async function getAccount(id: string, options: { fetch: typeof fetch }) {
	const { fetch } = options
	const userResponse = await fetch(`/api/v0/user/id/${id}`)
	return <Account>await userResponse.json()
}

export async function GET({ fetch, params }) {
	const id = params.id
	const account = await getAccount(id, { fetch })

	const path = params.path

	redirect(301, `/@${account.username}/${path}`)
}
