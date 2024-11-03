export function proxyApiUrl(url: string) {
	if (url.startsWith('/api/')) return url
	const urlObj = new URL(url)
	return `${urlObj.pathname}${urlObj.search}`
}
