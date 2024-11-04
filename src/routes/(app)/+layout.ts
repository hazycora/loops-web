import { browser } from '$app/environment'

async function getSelf(options: { fetch: FetchFunction }) {
	const { fetch } = options
	const selfResponse = await fetch('/api/v0/user/self')
	return <Account>await selfResponse.json()
}

async function updateSelf(options: { fetch: FetchFunction }) {
	const selfData = await getSelf(options)
	const timestamp = new Date().getTime()
	sessionStorage.setItem('selfObject', JSON.stringify(selfData))
	sessionStorage.setItem('selfTimestamp', timestamp.toString())
	return self
}

export async function load({ fetch }) {
	if (!browser) {
		return { self: await getSelf({ fetch }) }
	}
	const now = new Date().getTime()
	const selfTimestamp = parseInt(sessionStorage.getItem('selfTimestamp') || '0')
	const delta = now - selfTimestamp

	if (delta > 1000 * 60) {
		await updateSelf({ fetch })
	}
	const self = <Account>JSON.parse(<string>sessionStorage.getItem('selfObject'))
	return { self }
}
