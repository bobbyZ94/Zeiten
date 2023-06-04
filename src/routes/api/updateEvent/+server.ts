import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals }) => {
  const { id, start, end, checked, title, description } = await request.json()
  const record = await locals.pb.collection('events').update(id, {
    start,
    end,
    checked,
    title,
    description
  });
  return json(record);
}) satisfies RequestHandler;