<script lang="ts">
	import '../app.postcss'
	import { Navbar, Button, NavBrand } from 'flowbite-svelte'
	export let data
</script>

<div class="flex h-screen w-full flex-col">
	<Navbar>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold">Z E I T E N</span>
		</NavBrand>
		<div class="h-8">
			{#if data.user}
				<form action="/logout" method="POST">
					<Button size="sm" type="submit">Logout</Button>
				</form>
			{/if}
		</div>
	</Navbar>
	<div class="flex-grow">
		<slot />
	</div>
</div>
