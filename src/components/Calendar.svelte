<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte'
	import Calendar from '@event-calendar/core'
	import DayGrid from '@event-calendar/day-grid'
	import Interaction from '@event-calendar/interaction'
	export let username: any
	export let color: any
	let defaultModal = false

	let ec: any
	let currentEvent: any
	let plugins = [DayGrid, Interaction]
	let options = {
		view: 'dayGridMonth',
		firstDay: 1,
		buttonText: { today: 'Heute' },
		eventContent: function (info: any) {
			return `${info.event.title}`
		},
		dateClick: function (info: any) {
			currentEvent = info
			defaultModal = true
		},
		eventClick: function (info: any) {
			currentEvent = info
			defaultModal = true
		},
		events: [
			// your list of events
		]
	}

	function addWork(currentEvent: any) {
		if (ec.getEventById(currentEvent?.event?.id)) {
			ec.updateEvent({
				start: currentEvent.dateStr,
				end: currentEvent.dateStr,
				title: username,
				backgroundColor: 'green'
			})
		} else {
			ec.addEvent({
				start: currentEvent.dateStr,
				end: currentEvent.dateStr,
				title: username,
				backgroundColor: 'green'
			})
		}
	}

	function removeWork(currentEvent: any) {
		if (currentEvent.event.title === username) {
			ec.removeEventById(currentEvent.event.id)
		}
	}

	function addWorkMaybe(currentEvent: any) {
		if (ec.getEventById(currentEvent?.event?.id)) {
			ec.updateEvent({
				start: currentEvent.dateStr,
				end: currentEvent.dateStr,
				title: username,
				backgroundColor: 'gray'
			})
		} else {
			ec.addEvent({
				start: currentEvent.dateStr,
				end: currentEvent.dateStr,
				title: username,
				backgroundColor: 'gray'
			})
		}
	}
</script>

<Calendar bind:this={ec} {plugins} {options} />
<Modal title="Work" bind:open={defaultModal} autoclose>
	<p class="text-base leading-relaxed text-gray-700">Projekt X</p>
	<p class="text-base leading-relaxed text-gray-700">Mengen X</p>
	<svelte:fragment slot="footer">
		<Button on:click={() => addWork(currentEvent)}>Ich kann Arbeiten</Button>
		<Button on:click={() => addWorkMaybe(currentEvent)}>Ich kann vielleicht Arbeiten</Button>
		<Button on:click={() => removeWork(currentEvent)}>Ich kann nicht Arbeiten</Button>
	</svelte:fragment>
</Modal>
