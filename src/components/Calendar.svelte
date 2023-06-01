<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte'
	import Calendar from '@event-calendar/core'
	import DayGrid from '@event-calendar/day-grid'
	import Interaction from '@event-calendar/interaction'
	export let username: any

	let shiftModal = false
	let rmShiftModal = false
	let dateClickObject: any
	let eventClickObject: any

	let ec: any
	let plugins = [DayGrid, Interaction]
	let options = {
		view: 'dayGridMonth',
		firstDay: 1,
		buttonText: { today: 'Heute' },
		eventContent: function (info: any) {
			return `${info.event.title}`
		},
		dateClick: function (info: any) {
			// only open modal if worker has no shift
			const shiftOnClickedDay = ec
				.getEvents()
				.filter((event: any) => event.start.toDateString() === info.date.toDateString())
				.filter((event: any) => event.title === username)
			if (shiftOnClickedDay.length === 0) {
				dateClickObject = info
				shiftModal = true
			}
		},
		eventClick: function (info: any) {
			eventClickObject = info
			rmShiftModal = true
		},
		events: [
			// your list of events
		]
	}

	function addShift(dateClickObject: any) {
		ec.addEvent({
			start: dateClickObject.date,
			end: dateClickObject.date,
			title: username,
			backgroundColor: 'green'
		})
	}

	function rmShift(eventClickObject: any) {
		if (eventClickObject.event.title === username) {
			ec.removeEventById(eventClickObject.event.id)
		}
	}

	function addPossibleShift(dateClickObject: any) {
		ec.addEvent({
			start: dateClickObject.date,
			end: dateClickObject.date,
			title: username,
			backgroundColor: 'gray'
		})
	}
</script>

<Calendar bind:this={ec} {plugins} {options} />
<Modal title="Schicht hinzufügen" bind:open={shiftModal} autoclose outsideclose size="sm">
	<Button class="mr-5" on:click={() => addShift(dateClickObject)}>Ich kann Arbeiten</Button>
	<Button on:click={() => addPossibleShift(dateClickObject)}>Ich kann vielleicht Arbeiten</Button>
</Modal>
<Modal title="Schicht entfernen" bind:open={rmShiftModal} autoclose size="sm">
	<Button on:click={() => rmShift(eventClickObject)}>Schicht entfernen</Button>
</Modal>
