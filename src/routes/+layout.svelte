<script lang="ts">
	import '../app.postcss'
	import { browser } from '$app/environment'
	import { preferences } from '../stores/preferences'
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
							$preferences.compactView
								? ($preferences.compactView = false)
								: ($preferences.compactView = true)
							browser && location.reload()
						}}>{$preferences.compactView ? 'Erweiterte Ansicht' : 'Kompakte Ansicht'}</button
					></DropdownItem
				>
				<DropdownItem
					><button
						on:click={() => {
							$preferences.contrastView
								? ($preferences.contrastView = false)
								: ($preferences.contrastView = true)
							browser && location.reload()
						}}>{$preferences.contrastView ? 'Verringerter Kontrast' : 'Erhöhter Kontrast'}</button
					></DropdownItem
				>
				<DropdownItem
					><button
						on:click={() => {
							$preferences.showSunday
								? ($preferences.showSunday = false)
								: ($preferences.showSunday = true)
							browser && location.reload()
						}}>{$preferences.showSunday ? 'Zeige keine Sonntage' : 'Zeige Sonntage'}</button
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
