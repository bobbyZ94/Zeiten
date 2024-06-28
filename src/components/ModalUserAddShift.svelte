<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte'
	import { addShift } from '../lib/calendar/addShift'
	import { addVacation } from '$lib/calendar/addVacation'
	import SveltyPicker from 'svelty-picker'
	export let openModalUserAddShift: boolean
	export let ec: any
	export let worker: string
	export let username: string
	export let dateClickObject: any
	let endShiftTime: any
	const defaultTime = new Date()
	defaultTime.setHours(18)
</script>

<Modal
	title="Schicht hinzufügen"
	bind:open={openModalUserAddShift}
	size="sm"
	outsideclose
	classBody="flex-col flex justify-center items-center"
>
	<SveltyPicker
		bind:value={endShiftTime}
		format="hh"
		displayFormat="HH"
		pickerOnly
		hourOnly
		initialDate={defaultTime}
		clearBtn={false}
		clearToggle={false}
	/>
	<Button
		class="mr-2"
		on:click={() => {
			addShift(ec, worker, username, dateClickObject, false, false, endShiftTime)
			openModalUserAddShift = false
		}}>Ich kann Arbeiten bis {endShiftTime} Uhr</Button
	>
	<Button
		class="mr-2"
		on:click={() => {
			addShift(ec, worker, username, dateClickObject, true, false, endShiftTime)
			openModalUserAddShift = false
		}}>Ich kann vielleicht Arbeiten bis {endShiftTime} Uhr</Button
	>
	<Button
		on:click={() => {
			addVacation(ec, worker, username, dateClickObject, false)
			openModalUserAddShift = false
		}}>Ich bin im Urlaub</Button
	>
</Modal>
