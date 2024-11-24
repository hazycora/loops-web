const charset =
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('')

export function base64ToId(str: string) {
	const base = BigInt(64)
	const value = str
		.split('')
		.reverse()
		.reduce(
			(prev, char, i) =>
				prev + BigInt(charset.indexOf(char)) * base ** BigInt(i),
			BigInt(0)
		)
		.toString(10)
	return value
}

export function idToBase64(id: string) {
	const base = BigInt(64)
	let num = BigInt(id)
	let result = ''

	while (num > 0) {
		const remainder = num % base
		result = charset[Number(remainder)] + result
		num = num / base
	}

	return result || '0' // Return '0' if the input ID is 0
}
