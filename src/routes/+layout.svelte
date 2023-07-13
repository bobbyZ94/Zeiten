<script lang="ts">
	import '../app.postcss'
	import { browser } from '$app/environment'
	import { compactView } from '../stores/settingCompactView'
	import { Navbar, Button, NavBrand, Dropdown, DropdownItem } from 'flowbite-svelte'
	import Cog from '~icons/mdi/cog'
	export let data
</script>

<div class="flex h-screen w-full flex-col">
	<Navbar class="z-20 px-3 py-5">
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold sm:text-2xl"
				>Z E I T E N</span
			>
		</NavBrand>
		{#if data.user}
			<div>
				Hallo <span class="font-semibold">{data.user.username} 😀</span>
			</div>
			<Button size="sm"><Cog /></Button>
			<Dropdown>
				{#if data.user.username === 'Admin'}
					<DropdownItem href="/settings">Einstellungen</DropdownItem>
				{/if}
				<DropdownItem
					><button
						on:click={() => {
							$compactView ? ($compactView = false) : ($compactView = true)
							browser && location.reload()
						}}>{$compactView ? 'Kompakte Ansicht' : 'Erweiterte Ansicht'}</button
					></DropdownItem
				>
				<form action="/logout" method="POST">
					<DropdownItem type="submit">Logout</DropdownItem>
				</form>
			</Dropdown>
		{/if}
	</Navbar>
	<div class="flex-grow">
		<slot />
	</div>
</div>
