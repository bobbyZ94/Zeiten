<script lang="ts">
	import { Heading, Input, Label, Button, Toast, Select } from 'flowbite-svelte'
	import type { PageData, ActionData } from './$types'
	export let data: PageData
	export let form: ActionData
	const workers = data.workers
	let id: any
</script>

{#if form?.message}
	<Toast class="absolute left-0 right-0 top-4 z-50 mx-auto" color={form?.success ? 'green' : 'red'}>
		{form?.message}
	</Toast>
{/if}

<div class="flex items-center justify-center p-3">
	<div class="flex max-w-4xl flex-col gap-3">
		<div>
			<Heading customSize="text-5xl font-semibold text-center mb-5 mt-5">Einstellungen</Heading>
		</div>
		<!-- <div>
			<Heading customSize="text-2xl font-semibold">Termine</Heading>
		</div> -->
		<div>
			<Heading customSize="text-2xl font-semibold">Mitarbeiter hinzufügen</Heading>
			<form method="POST" action="?/createWorker">
				<div class="mb-3 grid gap-3 rounded-xl bg-white p-8">
					<div>
						<Label for="username" class="mb-2">Name (mind. 3 Zeichen)</Label>
						<Input type="text" id="username" name="username" required />
					</div>
					<div class="mb-6">
						<Label for="password" class="mb-2">Passwort (mind. 8 Zeichen)</Label>
						<Input type="text" id="password" name="password" required />
					</div>
					<Button class="w-full" type="submit">Hinzufügen</Button>
				</div>
			</form>
		</div>
		<div>
			<Heading customSize="text-2xl font-semibold">Mitarbeiter entfernen</Heading>
			<form method="POST" action="?/rmWorker">
				<div class="mb-3 grid gap-3 rounded-xl bg-white p-8">
					<div>
						<Label for="worker" class="mb-2">Mitarbeiter auswählen</Label>
						<Select
							bind:value={id}
							items={workers}
							type="text"
							id="id"
							name="id"
							placeholder="Wähle Mitarbeiter ..."
						/>
						<Button class="mt-3 w-full" type="submit">Entfernen</Button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
