import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://backend.geoz-sondierungen.de');

export const POST = (async ({ request }) => {
  const records = await pb.collection('events').getFullList({$autoCancel: false})
  // Transform into Event Objects
  const res: any = []
  records.forEach((record) => res.push({
    backgroundColor: record.backgroundColor,
    end: new Date(record.end),
    start: new Date(record.start),
    title: record.title,
    extendedProps: {
      description: record.description
    }
  }))
  return json(res);
}) satisfies RequestHandler;