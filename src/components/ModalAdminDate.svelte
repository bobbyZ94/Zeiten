<script lang="ts">
	import { Modal, Label, Button, Input, Textarea } from 'flowbite-svelte'
	import { addDate } from '../lib/calendar/addDate'
	export let openModalAdminDate: boolean
	export let description: string
	export let title: string
	export let ec: any
	export let username: string
	export let dateClickObject: any
</script>

<Modal title="Termin hinzufügen" bind:open={openModalAdminDate} autoclose outsideclose size="md">
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
		on:click={() =>
			addDate(ec, username, dateClickObject, 'red', title ? title : 'Arbeit', description)}
		>Arbeit hinzufügen</Button
	>
	<Button
		class="mr-2"
		on:click={() =>
			addDate(ec, username, dateClickObject, 'blue', title ? title : 'Urlaub', description)}
		>Urlaub hinzufügen</Button
	>
	<Button
		on:click={() =>
			addDate(ec, username, dateClickObject, 'burlywood', title ? title : 'Frei', description)}
		>Frei hinzufügen</Button
	>
</Modal>
