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
		const code = data.get('code')
		if (!email || !password) {
			error(400, 'Email and password are required.')
		}
		const authForm = new FormData()
		authForm.set('email', email)
		authForm.set('password', password)
		authForm.set('build', '8')
		if (code) {
			authForm.set('code', code)
		}

		const authRequestUrl = code ? '/auth/2fa/verify' : '/auth/start'

		authForm.set('device_name', 'Loops for ios')
		const authResponse = await fetch(authRequestUrl, {
			method: 'POST',
			body: authForm
		})
		if (
			!authResponse.ok ||
			authResponse.headers.get('content-type') !== 'application/json'
		) {
			const data = await authResponse.json()
			if ('message' in data) {
				const { message } = data
				console.error('Failed to log in.', message)
				error(500, 'Logging in failed: ' + message)
			}
			if (data['2FC'] && data['chp'] === 1) {
				return {
					email: email,
					password: password,

					'2FC': true
				}
			}
			console.error('Failed to log in.', data)
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
