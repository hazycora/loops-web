import type { RequestEvent } from './$types.js'

async function proxyLoopsApi(event: RequestEvent) {
	const { url, request, fetch, cookies } = event
	let body
	if (request.method != 'GET' && request.method != 'HEAD') {
		body = await request.blob()
	}
	const token = cookies.get('token')
	const response = await fetch(
		`https://loops.video${url.pathname}${url.search}`,
		{
			method: request.method,
			headers: {
				Authorization:
					request.headers.get('authorization') || `Bearer ${token}`,
				'Content-Type':
					request.headers.get('content-type') || 'application/json'
			},
			body: body
		}
	)
	const responseBody = await response.blob()
	return new Response(responseBody)
}

export const GET = proxyLoopsApi
export const POST = proxyLoopsApi
export const PATCH = proxyLoopsApi
export const PUT = proxyLoopsApi
export const DELETE = proxyLoopsApi
export const OPTIONS = proxyLoopsApi
