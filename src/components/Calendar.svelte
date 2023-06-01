<script lang="ts">
	import { Modal, Button, Input, Label, Textarea } from 'flowbite-svelte'
	import Calendar from '@event-calendar/core'
	import DayGrid from '@event-calendar/day-grid'
	import Interaction from '@event-calendar/interaction'
	export let username: any

	let shiftModal = false
	let rmShiftModal = false
	let adminModal = false
	let rmAdminModal = false
	let commitDragModal = false
	let dateClickObject: any
	let eventClickObject: any

	let title: any
	let description: any

	let ec: any
	let plugins = [DayGrid, Interaction]
	let options = {
		view: 'dayGridMonth',
		firstDay: 1,
		eventDurationEditable: false,
		eventStartEditable: username === 'Admin' ? true : false,
		eventDrop: async function(info: any) {
			eventClickObject = info
			commitDragModal = true
		},
		buttonText: { today: 'Heute' },
		eventContent: function (info: any) {
			return `${info.event.title}
			${info.event.extendedProps.description}`
		},
		dateClick: function (info: any) {
			// only open modal if no date
			const dateOnClickedDay = ec
				.getEvents()
				.filter((event: any) => event.start.toDateString() === info.date.toDateString())
				.filter((event: any) => event.extendedProps.username === username)
			if (dateOnClickedDay.length === 0) {
				dateClickObject = info
				if (username === 'Admin') {
					adminModal = true
				} else {
					shiftModal = true
				}
			}
		},
		eventClick: function (info: any) {
			if (username === 'Admin') {
				eventClickObject = info
				rmAdminModal = true
			} else if (info.event.title === username) {
				eventClickObject = info
				rmShiftModal = true
			}
		},
		eventSources: [
			{
				url: '/api/getEvents',
				method: 'POST'
			}
		]
	}

	async function addShift(dateClickObject: any, maybe: boolean) {
		const start = dateClickObject.date
		start.setHours(9)
		const end = dateClickObject.date
		end.setHours(9)
		await fetch('/api/addEvent', {
			method: 'POST',
			body: JSON.stringify({
				start,
				end,
				title: username,
				backgroundColor: maybe ? 'gray' : 'green',
				username
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		ec.refetchEvents()
	}

	async function addDate(
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

	async function rmDate(eventClickObject: any) {
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

	async function commitDragFunction(eventClickObject: any) {
		await fetch('/api/updateEvent', {
			method: 'POST',
			body: JSON.stringify({
			start: eventClickObject.event.start,
			end: eventClickObject.event.end,
			id: eventClickObject.event.id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		ec.refetchEvents()
	}
</script>

<Calendar bind:this={ec} {plugins} {options} />

<Modal title="Schicht hinzufügen" bind:open={shiftModal} autoclose outsideclose size="sm">
	<Button class="mr-2" on:click={() => addShift(dateClickObject, false)}>Ich kann Arbeiten</Button>
	<Button on:click={() => addShift(dateClickObject, true)}>Ich kann vielleicht Arbeiten</Button>
</Modal>

<Modal title="Schicht entfernen" bind:open={rmShiftModal} autoclose size="sm">
	<Button on:click={() => rmDate(eventClickObject)}>Schicht entfernen</Button>
</Modal>

<Modal title="Termin hinzufügen" bind:open={adminModal} autoclose size="md">
	<div class="grid gap-3">
		<div>
			<Label for="titel" class="mb-2">Titel</Label>
			<Input bind:value={title} type="text" id="titel" name="titel" />
		</div>
		<div class="">
			<Label for="titel" class="mb-2">Beschreibung</Label>
			<Textarea bind:value={description} type="text" id="titel" name="titel" />
		</div>
	</div>
	<Button
		class="mr-2"
		on:click={() => addDate(dateClickObject, 'red', title ? title : 'Arbeit', description)}
		>Arbeit hinzufügen</Button
	>
	<Button
		class="mr-2"
		on:click={() => addDate(dateClickObject, 'blue', title ? title : 'Urlaub', description)}
		>Urlaub hinzufügen</Button
	>
	<Button
		on:click={() => addDate(dateClickObject, 'burlywood', title ? title : 'Frei', description)}
		>Frei hinzufügen</Button
	>
</Modal>

<Modal
	title='Termin entfernen?'
	bind:open={rmAdminModal}
	autoclose
	size="sm"
>
	<Button on:click={() => rmDate(eventClickObject)}>Termin entfernen</Button>
</Modal>

<Modal
	title='Termin verschieben?'
	bind:open={commitDragModal}
	autoclose
	size="sm"
>
	<Button on:click={() => commitDragFunction(eventClickObject)}>Termin verschieben</Button>
</Modal>
