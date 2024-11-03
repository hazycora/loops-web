import { browser } from '$app/environment'

async function updateSelf() {
	const selfResponse = await fetch('/api/v0/user/self')
	const selfData = <Account>await selfResponse.json()
	const timestamp = new Date().getTime()
	const self = JSON.stringify({
		data: selfData,
		timestamp
	})
	sessionStorage.setItem('self', self)
	return self
}

export async function load() {
	if (!browser) return
	let selfJson = sessionStorage.getItem('self')
	if (!selfJson) {
		updateSelf()
	} else {
		const { timestamp } = JSON.parse(selfJson)
		const now = new Date().getTime()
		const delta = now - timestamp
		if (delta > 1000 * 60 * 5) {
			selfJson = await updateSelf()
		}
	}
	const self = <{ data: Account; timestamp: number }>(
		JSON.parse(<string>selfJson)
	)
	console.log(self)
	return { self: self.data }
}
