import { redirect, type Handle, error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from './lib/utils';

export const handle = (async ({ event, resolve }) => {
  event.locals.pb = new PocketBase('https://backend.geoz-sondierungen.de');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
	} else {
		event.locals.user = undefined;
	}
  
	// Protect all pages
  if (!event.url.pathname.startsWith("/login")) {
    if(!event.locals.user) {
      throw redirect(303, "/login")
    }
  }

	// Protect settings page
	if (event.url.pathname.startsWith("/settings")) {
    if(event.locals.user.username !== "Admin") {
      throw error(403, "Access Forbidden")
    }
  }

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: true }));

	return response;
}) satisfies Handle;