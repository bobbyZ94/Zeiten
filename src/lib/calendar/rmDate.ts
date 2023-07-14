export async function rmDate(ec: any, eventClickObject: any) {
	await fetch('/api/rmEvent', {
		method: 'POST',
		body: JSON.stringify({
			id: eventClickObject.event.id
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	ec.refetchEvents()
}
