export async function load({ cookies }) {
	const token = cookies.get('token')
	if (!token) {
		return {
			guestSession: true
		}
	}
}
