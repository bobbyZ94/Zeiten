<script lang="ts">
	import { Modal, Button, Input, Label, Textarea, Select } from 'flowbite-svelte'
	import Calendar from '@event-calendar/core'
	import DayGrid from '@event-calendar/day-grid'
	import Interaction from '@event-calendar/interaction'
	export let username: any
	export let workers: any

	let shiftModal = false
	let rmShiftModal = false
	let adminChooseModal = false
	let adminShiftModal = false
	let adminDateModal = false
	let updateAdminModal = false
	let commitDragModal = false
	let dateClickObject: any
	let eventClickObject: any

	let title: any
	let titleUpdate: any
	let description: any
	let descriptionUpdate: any
	let worker: any

	// get all satur- and sundays till in 20 years
	const d1 = new Date('2023-4-01')
	const d2 = new Date('2043-4-01')
	function getDatesInRange(startDate: any, endDate: any) {
		const date = new Date(startDate.getTime())

		const dates = []

		while (date <= endDate) {
			dates.push(new Date(date))
			date.setDate(date.getDate() + 1)
		}

		return dates
	}
	const weekendDays = getDatesInRange(d1, d2).filter(
		(date) => date.getDay() === 0 || date.getDay() === 6
	)

	let ec: any
	let plugins = [DayGrid, Interaction]
	let options = {
		view: 'dayGridMonth',
		firstDay: 1,
		eventDurationEditable: false,
		eventStartEditable: username === 'Admin' ? true : false,
		highlightedDates: weekendDays,
		eventDrop: async function (info: any) {
			eventClickObject = info
			setTimeout(() => (commitDragModal = true), 1)
		},
		buttonText: { today: 'Heute' },
		eventContent: function (info: any) {
			return `${info.event.title} ${info.event.extendedProps.checked ? '✔' : ''}
			${info.event.extendedProps.description}`
		},
		dateClick: function (info: any) {
			dateClickObject = info
			// only open modal if no date
			const dateOnClickedDay = ec
				.getEvents()
				.filter((event: any) => event.start.toDateString() === info.date.toDateString())
				.filter((event: any) => event.extendedProps.username === username)
			if (dateOnClickedDay.length === 0 && username !== 'Admin') {
				setTimeout(() => (shiftModal = true), 1)
			} else {
				setTimeout(() => (adminChooseModal = true), 1)
			}
		},
		eventClick: function (info: any) {
			if (username === 'Admin') {
				eventClickObject = info
				titleUpdate = eventClickObject?.event?.title
				descriptionUpdate = eventClickObject?.event?.extendedProps?.description
				setTimeout(() => (updateAdminModal = true), 1)
			} else if (info.event.title === username) {
				eventClickObject = info
				setTimeout(() => (rmShiftModal = true), 1)
			}
		},
		eventSources: [
			{
				url: '/api/getEvents',
				method: 'POST'
			}
		]
	}

	async function addShift(dateClickObject: any, maybe: boolean, admin: boolean = false) {
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
				backgroundColor: maybe ? 'gray' : 'green',
				username: admin ? worker : username
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

	async function updateEvent(
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

	$: console.log(eventClickObject)

	// reactively refetch when modal closes, so date gets visibly back to origin when canceled
	$: if (commitDragModal === false) {
		ec?.refetchEvents()
	}
</script>

<Calendar bind:this={ec} {plugins} {options} />

<Modal title="Schicht hinzufügen" bind:open={shiftModal} size="sm" autoclose outsideclose>
	<Button class="mr-2" on:click={() => addShift(dateClickObject, false)}>Ich kann Arbeiten</Button>
	<Button on:click={() => addShift(dateClickObject, true)}>Ich kann vielleicht Arbeiten</Button>
</Modal>

<Modal title="Schicht bearbeiten?" bind:open={rmShiftModal} autoclose outsideclose size="sm">
	<Button on:click={() => rmDate(eventClickObject)}>Schicht entfernen</Button>
</Modal>

<Modal
	title="Termin oder Mitarbeiter hinzufügen?"
	bind:open={adminChooseModal}
	autoclose
	outsideclose
	size="sm"
>
	<Button class="mr-2" on:click={() => (adminDateModal = true)}>Termin hinzufügen</Button>
	<Button on:click={() => (adminShiftModal = true)}>Mitarbeiter hinzufügen</Button>
</Modal>

<Modal title="Termin hinzufügen" bind:open={adminDateModal} autoclose outsideclose size="md">
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

<Modal title="Mitarbeiter hinzufügen" bind:open={adminShiftModal} autoclose outsideclose size="md">
	<div>
		<Label for="worker" class="mb-2">Mitarbeiter</Label>
		<Select
			bind:value={worker}
			items={workers}
			type="text"
			id="worker"
			name="worker"
			placeholder="Wähle Mitarbeiter ..."
		/>
	</div>

	<Button class="mr-2" on:click={() => addShift(dateClickObject, false, true)} disabled={!worker}
		>Mitarbeiter kann arbeiten</Button
	>
	<Button class="mr-2" on:click={() => addShift(dateClickObject, true, true)} disabled={!worker}
		>Mitarbeiter kann vielleicht arbeiten</Button
	>
</Modal>

<Modal
	title={eventClickObject?.event?.extendedProps?.username === 'Admin'
		? 'Termin bearbeiten'
		: 'Mitarbeiter bearbeiten'}
	bind:open={updateAdminModal}
	autoclose
	outsideclose
	size="sm"
>
	{#if eventClickObject?.event?.extendedProps?.username === 'Admin'}
		<div class="grid gap-3">
			<div>
				<Label for="titel" class="mb-2">Titel</Label>
				<Input bind:value={titleUpdate} type="text" id="titel" name="titel" />
			</div>
			<div class="">
				<Label for="titel" class="mb-2">Beschreibung</Label>
				<Textarea bind:value={descriptionUpdate} type="text" id="titel" name="titel" />
			</div>
		</div>
		<Button on:click={() => updateEvent(eventClickObject, false, titleUpdate, descriptionUpdate)}
			>Änderung speichern</Button
		>
	{:else if eventClickObject.event.extendedProps?.checked === false}
		<Button on:click={() => updateEvent(eventClickObject, true)}>Mitarbeiter bestätigen</Button>
	{:else}
		<Button on:click={() => updateEvent(eventClickObject, false)}
			>Mitarbeiter Bestätigung entfernen</Button
		>
	{/if}

	<Button class="ml-3" on:click={() => rmDate(eventClickObject)}
		>{eventClickObject?.event?.extendedProps?.username === 'Admin'
			? 'Termin entfernen'
			: 'Mitarbeiter entfernen'}</Button
	>
</Modal>

<Modal title="Termin verschieben?" bind:open={commitDragModal} autoclose outsideclose size="sm">
	<Button on:click={() => updateEvent(eventClickObject)}>Termin verschieben</Button>
</Modal>
