import type { Notification, Paginated } from '$lib/types.js'
import { redirect } from '@sveltejs/kit'

export async function load({ fetch, cookies }) {
	if (!cookies.get('token')) {
		redirect(303, '/')
	}
	const notificationsResponse = await fetch('/api/v0/notifications/self')
	const notificationsData = <Paginated<Notification>>(
		await notificationsResponse.json()
	)
	return {
		notifications: notificationsData
	}
}
