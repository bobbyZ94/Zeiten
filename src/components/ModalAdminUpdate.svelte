<script lang="ts">
	import { Modal, Label, Textarea, Input, Button } from 'flowbite-svelte'
	import { updateEvent } from '../lib/calendar/updateEvent'
	import { rmDate } from '../lib/calendar/rmDate'
	export let openModalAdminUpdate: boolean
	export let eventClickObject: any
	export let ec: any
	export let titleUpdate: string
	export let descriptionUpdate: string
</script>

<Modal
	title={eventClickObject?.event?.extendedProps?.username === 'Admin'
		? 'Termin bearbeiten'
		: 'Mitarbeiter bearbeiten'}
	bind:open={openModalAdminUpdate}
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
		<Button
			on:click={() => updateEvent(ec, eventClickObject, false, titleUpdate, descriptionUpdate)}
			>Änderung speichern</Button
		>
	{:else if eventClickObject.event.extendedProps?.checked === false}
		<Button on:click={() => updateEvent(ec, eventClickObject, true)}>Mitarbeiter bestätigen</Button>
	{:else}
		<Button on:click={() => updateEvent(ec, eventClickObject, false)}
			>Mitarbeiter Bestätigung entfernen</Button
		>
	{/if}

	<Button class="ml-3" on:click={() => rmDate(ec, eventClickObject)}
		>{eventClickObject?.event?.extendedProps?.username === 'Admin'
			? 'Termin entfernen'
			: 'Mitarbeiter entfernen'}</Button
	>
</Modal>
