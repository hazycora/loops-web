import { redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

const ALLOW_HTTP = env.ALLOW_HTTP

export const actions = {
	updateprofile: async ({ fetch, request }) => {
		const form = await request.formData()
		const body = {
			name: form.get('name'),
			bio: form.get('bio')
		}
		const updateBioResponse = await fetch('/api/v0/user/self/update-bio', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})

		const avatar = form.get('avatar')
		if (avatar) {
			const avatarForm = new FormData()
			avatarForm.append('avatar', avatar)
			const updateAvatarResponse = await fetch(
				'/api/v0/user/self/update-avatar',
				{
					method: 'POST',
					body: avatarForm
				}
			)
			if (!updateAvatarResponse.ok) {
				let message
				try {
					message = (await updateAvatarResponse.json()).message
				} catch {
					/* empty */
				}
				return {
					success: false,
					message: message ?? 'Failed to update avatar'
				}
			}
		}

		let message: string | null = null
		if (!updateBioResponse.ok) {
			try {
				message = (await updateBioResponse.json()).message
			} catch {
				/* empty */
			}
		}

		return {
			success: updateBioResponse.ok,
			message
		}
	},
	logout: async ({ cookies }) => {
		cookies.delete('token', {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			secure: !ALLOW_HTTP
		})
		redirect(303, '/')
	}
}
