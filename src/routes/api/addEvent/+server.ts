import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals }) => {
  const { start, end, title, backgroundColor, description, username } = await request.json()
  const record = await locals.pb.collection('events').create({
    start,
    end,
    title,
    backgroundColor,
    description,
    username,
  })
  return json(record);
}) satisfies RequestHandler;