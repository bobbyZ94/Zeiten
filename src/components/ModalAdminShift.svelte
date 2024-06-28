<script lang="ts">
	import { Modal, Label, Select, Button } from 'flowbite-svelte'
	import { addShift } from '../lib/calendar/addShift'
	import { addVacation } from '$lib/calendar/addVacation'
	import SveltyPicker from 'svelty-picker'
	export let openModalAdminShift: boolean
	export let workers: any
	export let worker: string
	export let ec: any
	export let username: string
	export let dateClickObject: any
	let endShiftTime: any
	const defaultTime = new Date()
	defaultTime.setHours(18)
</script>

<Modal
	title="Mitarbeiter hinzufügen"
	bind:open={openModalAdminShift}
	outsideclose
	size="md"
	classBody="flex-col flex justify-center items-center"
>
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
			addShift(ec, worker, username, dateClickObject, false, true, endShiftTime)
			openModalAdminShift = false
		}}
		disabled={!worker}>Mitarbeiter kann bis {endShiftTime} Uhr arbeiten</Button
	>
	<Button
		class="mr-2"
		on:click={() => {
			addShift(ec, worker, username, dateClickObject, true, true, endShiftTime)
			openModalAdminShift = false
		}}
		disabled={!worker}>Mitarbeiter kann vielleicht bis {endShiftTime} Uhr arbeiten</Button
	>
	<Button
		class="mr-2"
		on:click={() => {
			addVacation(ec, worker, username, dateClickObject, true)
			openModalAdminShift = false
		}}
		disabled={!worker}>Mitarbeiter hat Urlaub</Button
	>
</Modal>
