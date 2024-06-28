<script lang="ts">
	import { preferences } from '../stores/preferences'
	import Calendar from '@event-calendar/core'
	import DayGrid from '@event-calendar/day-grid'
	import Interaction from '@event-calendar/interaction'
	import { getDatesInRange } from '../lib/calendar/getDatesInRange'
	// import { changeContrast } from '../lib/calendar/changeContrast'
	import ModalEventInfo from './ModalEventInfo.svelte'
	import ModalCommitDrag from './ModalCommitDrag.svelte'
	import ModalAdminUpdate from './ModalAdminUpdate.svelte'
	import ModalAdminShift from './ModalAdminShift.svelte'
	import ModalAdminDate from './ModalAdminDate.svelte'
	import ModalAdminChoose from './ModalAdminChoose.svelte'
	import ModalUserRmShift from './ModalUserRmShift.svelte'
	import ModalUserAddShift from './ModalUserAddShift.svelte'

	// Current logged in user
	export let username: any

	// Array of current workers(users without Admin)
	export let workers: any

	// Booleans to open/close the modals
	let openModalUserAddShift = false
	let openModalUserRmShift = false
	let openModalAdminChoose = false
	let openModalAdminShift = false
	let openModalAdminDate = false
	let openModalAdminUpdate = false
	let openModalCommitDrag = false
	let openModalEventInfo = false

	// Event and date objects storage
	let dateClickObject: any
	let eventClickObject: any

	// Modal forms vars to bind values to
	let title: any
	let titleUpdate: any
	let description: any
	let descriptionUpdate: any
	let worker: any

	// Generate array of weekend days till in 20 years to highlite in calendar
	const d1 = new Date('2023-4-01')
	const d2 = new Date('2043-4-01')
	const weekendDays = getDatesInRange(d1, d2).filter(
		(date) => date.getDay() === 0 || date.getDay() === 6
	)

	// Init calendar
	let ec: any
	let plugins = [DayGrid, Interaction]
	let hiddenDays = []
	if (!$preferences.showSaturday) hiddenDays.push(6)
	if (!$preferences.showSunday) hiddenDays.push(0)
	let options = {
		view: 'dayGridMonth',
		hiddenDays: hiddenDays,
		firstDay: 1,
		eventDurationEditable: false,
		eventStartEditable: username === 'Admin' ? true : false,
		highlightedDates: weekendDays,
		eventDrop: async function (info: any) {
			eventClickObject = info
			setTimeout(() => (openModalCommitDrag = true), 1)
		},
		buttonText: { today: 'Heute' },
		eventContent: function (info: any) {
			return {
				html: `<p class="break-all">
					${info.event.title} 
					${info.event.extendedProps.endShiftTime && 'bis ' + info.event.extendedProps.endShiftTime + ' Uhr'}
					${info.event.extendedProps.checked ? '✔' : ''}
					${$preferences.compactView ? '' : info.event.extendedProps.description}
				</p>`
			}
		},
		dateClick: async function (info: any) {
			dateClickObject = info
			// Only open ModalUserAddShift if user has no shift on that day
			const res = await fetch('/api/getEvents', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((res) => res.json())
			// Get all events from current day where user === current user and not admin
			const allEventsFromCurrentDay = res
				.filter(
					(event: any) =>
						new Intl.DateTimeFormat('de-DE', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric'
						}).format(new Date(event.start)) ===
						new Intl.DateTimeFormat('de-DE', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric'
						}).format(new Date(dateClickObject.date))
				)
				.filter((event: any) => username === event.extendedProps.username)
				.filter((event: any) => event.username !== 'Admin')
			console.log(allEventsFromCurrentDay)

			if (allEventsFromCurrentDay < 1 && username !== 'Admin') {
				setTimeout(() => (openModalUserAddShift = true), 1)
			} else if (username === 'Admin') {
				setTimeout(() => (openModalAdminChoose = true), 1)
			}
		},
		eventClick: function (info: any) {
			if (username === 'Admin') {
				eventClickObject = info
				titleUpdate = eventClickObject?.event?.title
				descriptionUpdate = eventClickObject?.event?.extendedProps?.description
				setTimeout(() => (openModalAdminUpdate = true), 1)
			} else if (info.event.extendedProps.username === username) {
				eventClickObject = info
				setTimeout(() => (openModalUserRmShift = true), 1)
			} else {
				eventClickObject = info
				setTimeout(() => (openModalEventInfo = true), 1)
			}
		},
		eventSources: [
			{
				url: '/api/getEvents',
				method: 'POST'
			}
		]
	}

	// reactively refetch when modal closes, so date gets visibly back to origin when canceled
	$: if (openModalCommitDrag === false) {
		ec?.refetchEvents()
	}

	// Change contrast based on preference
	// $: $preferences.contrastView, changeContrast($preferences)
</script>

<Calendar bind:this={ec} {plugins} {options} />

<ModalUserAddShift
	bind:dateClickObject
	bind:openModalUserAddShift
	bind:worker
	bind:username
	bind:ec
/>

<ModalUserRmShift bind:eventClickObject bind:openModalUserRmShift bind:ec />

<ModalAdminChoose bind:openModalAdminChoose bind:openModalAdminDate bind:openModalAdminShift />

<ModalAdminDate
	bind:dateClickObject
	bind:openModalAdminDate
	bind:title
	bind:username
	bind:description
	bind:ec
/>

<ModalAdminShift
	bind:dateClickObject
	bind:openModalAdminShift
	bind:worker
	bind:workers
	bind:username
	bind:ec
/>

<ModalAdminUpdate
	bind:eventClickObject
	bind:openModalAdminUpdate
	bind:ec
	bind:titleUpdate
	bind:descriptionUpdate
/>

<ModalCommitDrag bind:eventClickObject bind:openModalCommitDrag bind:ec />

<ModalEventInfo bind:eventClickObject bind:openModalEventInfo />
