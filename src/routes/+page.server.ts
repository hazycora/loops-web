import { error, redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

const ALLOW_HTTP = env.ALLOW_HTTP

export async function load({ cookies }) {
	const token = cookies.get('token')
	if (token) {
		redirect(303, '/feed')
	}
}

export const actions = {
	default: async ({ fetch, request, cookies }) => {
		const data = await request.formData()
		const email = data.get('email')
		const password = data.get('password')
		if (!email || !password) {
			error(400, 'Email and password are required.')
		}
		const authForm = new FormData()
		authForm.set('email', email)
		authForm.set('password', password)
		authForm.set('build', '4')
		authForm.set('device_name', 'Loops for ios')
		const authResponse = await fetch('https://loops.video/auth/start', {
			method: 'POST',
			headers: {
				'User-Agent': 'Loops/4 CFNetwork/1568.100.1.2.1 Darwin/24.0.0'
			},
			body: authForm
		})
		if (
			!authResponse.ok ||
			authResponse.headers.get('content-type') !== 'application/json'
		) {
			console.error('Failed to log in.', authResponse.status)
			error(500, 'Logging in failed.')
		}
		const tokenData = <{ auth_token: string }>await authResponse.json()
		cookies.set('token', tokenData.auth_token, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			secure: !ALLOW_HTTP
		})

		redirect(303, '/feed')
	}
}
