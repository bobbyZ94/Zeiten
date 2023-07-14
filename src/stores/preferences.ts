import { persisted } from 'svelte-local-storage-store'

export const preferences = persisted('preferences', {
	compactView: true,
	contrastView: false,
	showSunday: false
})
