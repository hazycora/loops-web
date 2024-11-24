import { redirect } from '@sveltejs/kit'

export async function GET({ params }) {
	const id = params.id

	redirect(308, `/v/${id}`)
}
