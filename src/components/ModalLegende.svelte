<script lang="ts">
	import { Modal } from 'flowbite-svelte'
	export let openModalLegende: boolean
</script>

<Modal title="Legende" bind:open={openModalLegende} autoclose outsideclose size="sm">
	<div>
		<ul class="flex flex-col gap-3">
			<li class="flex items-center justify-center gap-3">
				<div class="h-6 w-6 rounded-lg bg-red-600" />
				<div class="">Arbeitstermin</div>
			</li>
			<li class="flex items-center justify-center gap-3">
				<div class="h-6 w-6 rounded-lg bg-green-500" />
				<div class="">Mitarbeiter kann arbeiten</div>
			</li>
			<li class="flex items-center justify-center gap-3">
				<div class="h-6 w-6 rounded-lg bg-green-500">✔️</div>
				<div class="">Mitarbeiter muss arbeiten</div>
			</li>
			<li class="flex items-center justify-center gap-3">
				<div class="h-6 w-6 rounded-lg bg-gray-300" />
				<div class="">Mitarbeiter kann vielleicht arbeiten</div>
			</li>
			<li class="flex items-center justify-center gap-3">
				<div class="h-6 w-6 rounded-lg bg-blue-600" />
				<div class="">Mitarbeiter im Urlaub oder Betriebsferien</div>
			</li>
			<li class="flex items-center justify-center gap-3">
				<div class="h-6 w-6 rounded-lg bg-orange-300" />
				<div class="">Betriebsfreier Tag</div>
			</li>
		</ul>
	</div>
</Modal>
