export const actions = {
	default: async ({ fetch, request }) => {
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
				return {
					success: false,
					message: 'Failed to update avatar'
				}
			}
		}

		return {
			success: updateBioResponse.ok
		}
	}
}
