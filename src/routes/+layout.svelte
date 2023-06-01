<script lang="ts">
	import '../app.postcss'
	import { Navbar, Button, NavBrand } from 'flowbite-svelte'
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
			<div>Hallo <span class="font-semibold">{data.user.username}</span> 😀</div>
			<div class="h-8">
				<form action="/logout" method="POST">
					<Button size="sm" type="submit">Logout</Button>
				</form>
			</div>
		{/if}
	</Navbar>
	<div class="flex-grow">
		<slot />
	</div>
</div>
