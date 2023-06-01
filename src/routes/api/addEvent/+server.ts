import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://backend.geoz-sondierungen.de');

export const POST = (async ({ request }) => {
  const { start, end, title, backgroundColor, description, username, id } = await request.json()
  const record = await pb.collection('events').create({
    start,
    end,
    title,
    backgroundColor,
    description,
    username,
    id
  })
  return json(record);
}) satisfies RequestHandler;