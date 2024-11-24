import { redirect } from '@sveltejs/kit'

function base64ToId(str: string) {
	const charset =
		'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('')
	const base = BigInt(64)
	const value = str
		.split('')
		.reverse()
		.reduce(
			(prev, char, i) =>
				prev + BigInt(charset.indexOf(char)) * base ** BigInt(i),
			BigInt(0)
		)
		.toString(10)
	return value
}

export async function GET({ params }) {
	const base64Id = params.id

	const id = base64ToId(base64Id)

	redirect(308, `/video/${id}`)
}
