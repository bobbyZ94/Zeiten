export const load = (async ({ params, locals }) => {
  const records = await locals.pb.collection('users').getFullList()
  let res: any = []
  records.forEach((record: any) => res.push({value: record.id, name: record.username}))
  res = res.filter((record: any) => record.value !== 'Admin')
    return {
      workers: res
    }
})