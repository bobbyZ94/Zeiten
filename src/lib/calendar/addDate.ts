export async function addDate(
	ec: any,
	username: any,
	dateClickObject: any,
	backgroundColor = 'red',
	title: any,
	description: any = ''
) {
	// TODO: timezone workaround
	const start = dateClickObject.date
	start.setHours(8)
	const end = dateClickObject.date
	end.setHours(8)
	await fetch('/api/addEvent', {
		method: 'POST',
		body: JSON.stringify({
			start,
			end,
			title,
			backgroundColor,
			description,
			username
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	ec.refetchEvents()
}
