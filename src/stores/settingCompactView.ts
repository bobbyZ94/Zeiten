import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export const compactView = writable<boolean>(browser && localStorage.compactView === 'true')

if (browser) compactView.subscribe((value) => (localStorage.compactView = String(value)))
