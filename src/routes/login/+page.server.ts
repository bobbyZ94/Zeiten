import { redirect, error } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		const data = await request.formData();
		const username = data.get('username');
    const password = data.get('password');
		
		console.log('data', username, password);
		try {
			await locals.pb.collection('users').authWithPassword(username, password);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong logging in');
		}

		throw redirect(303, '/');
	}
} satisfies Actions