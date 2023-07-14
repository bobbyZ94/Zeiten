<script lang="ts">
	import { Modal } from 'flowbite-svelte'
	export let openModalEventInfo: boolean
	export let eventClickObject: any
</script>

<Modal
	title={`${
		eventClickObject?.event?.title ? eventClickObject?.event?.title : 'Termin Informationen'
	}`}
	bind:open={openModalEventInfo}
	autoclose
	outsideclose
	size="sm"
>
	<div>
		{eventClickObject?.event?.extendedProps?.description
			? eventClickObject?.event?.extendedProps?.description
			: 'Keine Beschreibung verfügbar.'}
	</div>
</Modal>
