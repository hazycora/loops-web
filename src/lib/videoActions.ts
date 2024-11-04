import type { Video } from './types'

export function downloadVideo(video: Video) {
	const iosUser = /iPhone|iPad|iPod/i.test(navigator.userAgent)

	const filename = <string>video.media.src_url.split('/').pop()

	if (iosUser) {
		fetch(video.media.src_url)
			.then(response => response.blob())
			.then(blob => {
				const files = [new File([blob], filename, { type: 'video/mp4' })]
				navigator.share({ files })
			})
		return
	}

	const a = document.createElement('a')
	a.href = video.media.src_url
	a.download = filename
	a.click()
}

export function shareVideo(video: Video) {
	const origin = window.origin
	const videoUrl = `${origin}/video/${video.id}`
	if ('share' in navigator) {
		navigator.share({ url: `${origin}/video/${video.id}` })
		return
	}
	if ('clipboard' in <Navigator>navigator) {
		;(<Navigator>navigator).clipboard.writeText(videoUrl)
	}
}

export async function likeVideo(video: Video) {
	video.has_liked = true
	const likeResponse = await fetch(`/api/v0/like/video/${video.id}`, {
		method: 'POST'
	})
	video.has_liked = likeResponse.ok
	if (likeResponse.ok) {
		video.likes += 1
	}
}
