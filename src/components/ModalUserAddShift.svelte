<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte'
	import { addShift } from '../lib/calendar/addShift'
	export let openModalUserAddShift: boolean
	export let ec: any
	export let worker: string
	export let username: string
	export let dateClickObject: any
</script>

<Modal
	title="Schicht hinzufügen"
	bind:open={openModalUserAddShift}
	size="sm"
	autoclose
	outsideclose
>
	<Button class="mr-2" on:click={() => addShift(ec, worker, username, dateClickObject, false)}
		>Ich kann Arbeiten</Button
	>
	<Button on:click={() => addShift(ec, worker, username, dateClickObject, true)}
		>Ich kann vielleicht Arbeiten</Button
	>
</Modal>
