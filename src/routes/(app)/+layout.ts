import { browser } from '$app/environment'

async function getSelf(options: { fetch: FetchFunction }) {
	const { fetch } = options
	const selfResponse = await fetch('/api/v0/user/self')
	return <Account>await selfResponse.json()
}

async function updateSelf(options: { fetch: FetchFunction }) {
	const selfData = await getSelf(options)
	const timestamp = new Date().getTime()
	const self = JSON.stringify({
		data: selfData,
		timestamp
	})
	sessionStorage.setItem('self', self)
	return self
}

export async function load({ fetch }) {
	if (!browser) {
		return { self: await getSelf({ fetch }) }
	}
	let selfJson = sessionStorage.getItem('self')
	if (!selfJson) {
		updateSelf({ fetch })
	} else {
		const { timestamp } = JSON.parse(selfJson)
		const now = new Date().getTime()
		const delta = now - timestamp
		if (delta > 1000 * 60 * 5) {
			selfJson = await updateSelf({ fetch })
		}
	}
	const self = <{ data: Account; timestamp: number }>(
		JSON.parse(<string>selfJson)
	)
	return { self: self.data }
}
