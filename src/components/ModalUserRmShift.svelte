<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte'
	import { rmDate } from '../lib/calendar/rmDate'
	export let openModalUserRmShift: boolean
	export let ec: any
	export let eventClickObject: any
</script>

<Modal title="Termin entfernen?" bind:open={openModalUserRmShift} autoclose outsideclose size="sm">
	<Button on:click={() => rmDate(ec, eventClickObject)}>Termin entfernen</Button>
</Modal>
