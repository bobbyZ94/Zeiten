import { error } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
  const records = await locals.pb.collection('users').getFullList()
  let res: any = []
  records.forEach((record: any) => res.push({value: record.id, name: record.username}))
  res = res.filter((record: any) => record.name !== 'Admin')
    return {
      workers: res
    }
})

export const actions = {
	createWorker: async ({ request, locals }) => {
		const data = await request.formData();
    const worker = {
      username: data.get('username'),
      password: data.get('password'),
      passwordConfirm: data.get('password'),
      role: 'user'
    }
		try {
			await locals.pb.collection('users').create(worker);
      return {
        message: "Mitarbeiter erfolgreich erstellt",
				success: true
      }
		} catch (err) {
			console.log('Error: ', err);
			return {
        message: `Mitarbeiter hinzufügen fehlgeschlagen. Error: ${err}`,
				success: false
      }
		}
	},
  rmWorker: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id')
		try {
			await locals.pb.collection('users').delete(id);
			return {
        message: "Mitarbeiter erfolgreich entfernt",
				success: true
      }
		} catch (err) {
			console.log('Error: ', err);
			return {
        message: `Mitarbeiter entfernen fehlgeschlagen. Error: ${err}`,
				success: false
      }
		}
	}
} satisfies Actions