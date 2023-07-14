export async function updateEvent(
	ec: any,
	eventClickObject: any,
	checked: boolean = false,
	title = eventClickObject.event.title,
	description = ''
) {
	const start = eventClickObject.event.start
	start.setHours(eventClickObject.event.extendedProps.username === 'Admin' ? 8 : 9)
	const end = eventClickObject.event.end
	end.setHours(eventClickObject.event.extendedProps.username === 'Admin' ? 8 : 9)
	await fetch('/api/updateEvent', {
		method: 'POST',
		body: JSON.stringify({
			start,
			end,
			id: eventClickObject.event.id,
			checked,
			title,
			description
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	ec.refetchEvents()
}
