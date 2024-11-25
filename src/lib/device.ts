import { browser } from '$app/environment'

const device = {
	iPhone: false,
	installed: false
}

if (browser) {
	const ua = navigator.userAgent.toLowerCase()

	device.iPhone = ua.includes('iphone os')
	device.installed = window.matchMedia('(display-mode: standalone)').matches
}

export default device
