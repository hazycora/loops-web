import { env } from '$env/dynamic/private'
import { error, type Cookies } from '@sveltejs/kit'

const LOOPS_PUBLIC_TOKEN = env.LOOPS_PUBLIC_TOKEN

function canUsePublicToken(request: Request): boolean {
	const url = new URL(request.url)
	if (request.method != 'GET') {
		if (url.pathname == '/api/v0.5/search/users' && request.method == 'POST') {
			// why is this POST???
			return true
		}
		return false
	}
	if (!url.pathname.startsWith('/api/v0/')) return false
	if (url.pathname.startsWith('/api/v0/user/self')) return false
	return true
}

export async function proxyLoopsApi(event: {
	url: URL
	request: Request
	fetch: typeof fetch
	cookies: Cookies
}) {
	const { url, request, fetch, cookies } = event
	let body
	if (request.method != 'GET' && request.method != 'HEAD') {
		body = await request.blob()
	}
	const token = cookies.get('token')

	let authorization = request.headers.get('authorization')
	if (!authorization) {
		if (token) {
			authorization = `Bearer ${token}`
		} else if (canUsePublicToken(request)) {
			authorization = `Bearer ${LOOPS_PUBLIC_TOKEN}`
		}
	}

	const headers: { [key: string]: string } = {
		Accept: 'application/json',
		'Content-Type': request.headers.get('content-type') || 'application/json'
	}

	if (authorization) {
		headers['Authorization'] = authorization
	}

	const response = await fetch(
		`https://loops.video${url.pathname}${url.search}`,
		{
			method: request.method,
			headers: headers,
			body: body
		}
	)

	const isJson = response.headers
		.get('content-type')
		?.includes('application/json')

	if (!isJson) {
		error(500, 'Invalid response from Loops API')
	}

	if (!response.ok) {
		const error = await response.json()
		console.error('Error from Loops API', url.pathname, error)
		return new Response(JSON.stringify(error), {
			status: response.status,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	const responseBody = await response.blob()
	return new Response(responseBody)
}
