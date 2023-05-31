// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb
			authStore
			user
		}
		// interface PageData {}
		// interface Platform {}
	}
	declare module '@event-calendar/core'
	declare module '@event-calendar/time-grid'
}



export {};
