import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals }) => {
  const { id } = await request.json()
  const record = await locals.pb.collection('events').delete(id)
  return json(record);
}) satisfies RequestHandler;