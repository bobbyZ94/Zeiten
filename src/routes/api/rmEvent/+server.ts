import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://backend.geoz-sondierungen.de');

export const POST = (async ({ request }) => {
  const { id } = await request.json()
  const record = await pb.collection('events').delete(id)
  return json(record);
}) satisfies RequestHandler;