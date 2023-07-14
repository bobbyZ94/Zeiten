<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte'
	export let openModalAdminChoose: boolean
	export let openModalAdminDate: any
	export let openModalAdminShift: any
</script>

<Modal
	title="Termin oder Mitarbeiter hinzufügen?"
	bind:open={openModalAdminChoose}
	autoclose
	outsideclose
	size="sm"
>
	<Button class="mr-2" on:click={() => (openModalAdminDate = true)}>Termin hinzufügen</Button>
	<Button on:click={() => (openModalAdminShift = true)}>Mitarbeiter hinzufügen</Button>
</Modal>
