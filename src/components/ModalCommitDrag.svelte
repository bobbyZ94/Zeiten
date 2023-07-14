<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte'
	import { updateEvent } from '../lib/calendar/updateEvent'
	export let openModalCommitDrag: boolean
	export let eventClickObject: any
	export let ec: any
</script>

<Modal title="Termin verschieben?" bind:open={openModalCommitDrag} autoclose outsideclose size="sm">
	<Button on:click={() => updateEvent(ec, eventClickObject)}>Termin verschieben</Button>
</Modal>
