import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ locals }) => {
  const records = await locals.pb.collection('events').getFullList({$autoCancel: false})
  // Transform into Event Objects
  const res: any = []
  records.forEach((record: any) => res.push({
    id: record.id,
    backgroundColor: record.backgroundColor,
    end: new Date(record.end),
    start: new Date(record.start),
    title: record.title,
    extendedProps: {
      description: record.description,
      username: record.username,
      checked: record.checked
    }
  }))
  return json(res);
}) satisfies RequestHandler;