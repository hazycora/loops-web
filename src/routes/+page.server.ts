import { error, redirect } from '@sveltejs/kit'

export const actions = {
	default: async ({ fetch, request, cookies }) => {
		const data = await request.formData()
		const email = data.get('email')
		const password = data.get('password')
		const authResponse = await fetch('https://loops.video/auth/start', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				build: '4',
				device_name: 'hazyui'
			})
		})
		if (!authResponse.ok) {
			error(authResponse.status, authResponse.statusText)
		}
		const tokenData = <{ auth_token: string }>await authResponse.json()
		cookies.set('token', tokenData.auth_token, { path: '/' })

		redirect(303, '/feed')
	}
}
