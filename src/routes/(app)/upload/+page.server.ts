import { error } from '@sveltejs/kit'

export const actions = {
	default: async ({ fetch, request }) => {
		const form = await request.formData()
		const videoForm = new FormData()
		const video = form.get('video')
		const description = form.get('description')
		if (!video || !description) {
			error(400, 'Missing video or description')
		}
		videoForm.append('video', video)
		videoForm.append('description', description)
		const postVideoResponse = await fetch('/api/v0/upload/video', {
			method: 'POST',
			body: videoForm
		})

		const postVideo = await postVideoResponse.json()

		return {
			success: postVideoResponse.ok,
			video: postVideo
		}
	}
}
