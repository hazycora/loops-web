import { redirect } from '@sveltejs/kit'

export async function GET() {
	redirect(308, `/feed/for-you`)
}
