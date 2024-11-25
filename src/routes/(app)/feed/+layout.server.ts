import { redirect } from '@sveltejs/kit'

export async function load({ cookies }) {
	const token = cookies.get('token')
	if (!token) {
		redirect(307, '/')
	}
}
