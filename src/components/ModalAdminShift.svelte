<script lang="ts">
	import { Modal, Label, Select, Button } from 'flowbite-svelte'
	import { addShift } from '../lib/calendar/addShift'
	import { addVacation } from '$lib/calendar/addVacation'
	export let openModalAdminShift: boolean
	export let workers: any
	export let worker: string
	export let ec: any
	export let username: string
	export let dateClickObject: any
</script>

<Modal
	title="Mitarbeiter hinzufügen"
	bind:open={openModalAdminShift}
	autoclose
	outsideclose
	size="md"
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

	<Button
		class="mr-2"
		on:click={() => addShift(ec, worker, username, dateClickObject, false, true)}
		disabled={!worker}>Mitarbeiter kann arbeiten</Button
	>
	<Button
		class="mr-2"
		on:click={() => addShift(ec, worker, username, dateClickObject, true, true)}
		disabled={!worker}>Mitarbeiter kann vielleicht arbeiten</Button
	>
	<Button
		class="mr-2"
		on:click={() => addVacation(ec, worker, username, dateClickObject, true)}
		disabled={!worker}>Mitarbeiter hat Urlaub</Button
	>
</Modal>
