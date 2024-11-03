// edited from https://gist.github.com/paoloricciuti/94a7920e276c06235ceac4026b85db21#file-usemediaquerystore-js
import { readable } from 'svelte/store'

export const useMediaQuery = (
	mediaQueryString: string,
	defaultValue: boolean | undefined = undefined
) => {
	const matches = readable(<boolean | undefined>undefined, set => {
		if (typeof window === 'undefined') {
			if (typeof defaultValue !== 'undefined') set(defaultValue)
			return () => {}
		}
		const mediaQuery = window.matchMedia(mediaQueryString)
		set(mediaQuery.matches)
		const listener = (e: MediaQueryListEvent) => set(e.matches)
		mediaQuery.addEventListener('change', listener)
		return () => {
			mediaQuery.removeEventListener('change', listener)
		}
	})
	return matches
}
