<script lang="ts">
	import { Modal, Button, Input, Label, Textarea } from 'flowbite-svelte'
	import Calendar from '@event-calendar/core'
	import DayGrid from '@event-calendar/day-grid'
	import Interaction from '@event-calendar/interaction'
	import { v4 as uuidv4 } from 'uuid'
	export let username: any

	let shiftModal = false
	let rmShiftModal = false
	let adminModal = false
	let rmAdminModal = false
	let dateClickObject: any
	let eventClickObject: any

	let title: any
	let description: any

	let ec: any
	let plugins = [DayGrid, Interaction]
	let options = {
		view: 'dayGridMonth',
		firstDay: 1,
		eventStartEditable: false,
		buttonText: { today: 'Heute' },
		eventContent: function (info: any) {
			return `${info.event.title}
			${info.event.extendedProps.description}`
		},
		dateClick: function (info: any) {
			// only open modal if no shift
			const shiftOnClickedDay = ec
				.getEvents()
				.filter((event: any) => event.start.toDateString() === info.date.toDateString())
				.filter((event: any) => event.title === username)

			if (shiftOnClickedDay.length === 0) {
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

	function addShift(dateClickObject: any) {
		const start = dateClickObject.date
		start.setHours(9)
		const end = dateClickObject.date
		end.setHours(9)
		ec.addEvent({
			start,
			end,
			title: username,
			backgroundColor: 'green'
		})
	}

	function addPossibleShift(dateClickObject: any) {
		const start = dateClickObject.date
		start.setHours(9)
		const end = dateClickObject.date
		end.setHours(9)
		ec.addEvent({
			start,
			end,
			title: username,
			backgroundColor: 'gray'
		})
	}

	async function addDate(
		dateClickObject: any,
		backgroundColor = 'red',
		title: any,
		description: any = ''
	) {
		const start = dateClickObject.date
		start.setHours(8)
		const end = dateClickObject.date
		end.setHours(8)
		const event = ec.addEvent({
			start,
			end,
			title,
			backgroundColor,
			extendedProps: {
				description,
				username
			},
			id: uuidv4()
		})
		await fetch('/api/addEvent', {
			method: 'POST',
			body: JSON.stringify({
				start,
				end,
				title,
				backgroundColor,
				description,
				username,
				id: event.id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		ec.refetchEvents()
	}

	function rmDate(eventClickObject: any) {
		ec.removeEventById(eventClickObject.event.id)
	}
</script>

<Calendar bind:this={ec} {plugins} {options} />

<Modal title="Schicht hinzufügen" bind:open={shiftModal} autoclose outsideclose size="sm">
	<Button class="mr-2" on:click={() => addShift(dateClickObject)}>Ich kann Arbeiten</Button>
	<Button on:click={() => addPossibleShift(dateClickObject)}>Ich kann vielleicht Arbeiten</Button>
</Modal>

<Modal title="Schicht entfernen" bind:open={rmShiftModal} autoclose size="sm">
	<Button on:click={() => rmDate(eventClickObject)}>Schicht entfernen</Button>
</Modal>

<Modal title="Termin hinzufügen" bind:open={adminModal} autoclose size="md">
	<div class="mb-3 grid gap-6">
		<div>
			<Label for="titel" class="mb-2">Titel</Label>
			<Input bind:value={title} type="text" id="titel" name="titel" />
		</div>
		<div class="mb-6">
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

<Modal title="Termin bearbeiten" bind:open={rmAdminModal} autoclose size="sm">
	<Button on:click={() => rmDate(eventClickObject)}>Termin entfernen</Button>
</Modal>
