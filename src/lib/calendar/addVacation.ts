export async function addVacation(
	ec: any,
	worker: any,
	username: any,
	dateClickObject: any,
	admin: boolean = false
) {
	const start = dateClickObject.date
	start.setHours(9)
	const end = dateClickObject.date
	end.setHours(9)
	await fetch('/api/addEvent', {
		method: 'POST',
		body: JSON.stringify({
			start,
			end,
			title: admin ? worker : username,
			backgroundColor: 'blue',
			username: admin ? worker : username
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	ec.refetchEvents()
}
