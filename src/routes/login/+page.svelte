<script>
	import { Input, Label, Button } from 'flowbite-svelte'
</script>

<div class="flex h-full w-full items-center justify-center p-8">
	<form autocomplete="on" method="POST" action="?/login">
		<div class="mb-3 grid gap-6">
			<div>
				<Label for="username" class="mb-2">Name</Label>
				<Input type="text" id="username" name="username" autocomplete="username" required />
			</div>
			<div class="mb-6">
				<Label for="password" class="mb-2">Passwort</Label>
				<Input
					type="password"
					id="password"
					name="password"
					autocomplete="current-password"
					required
				/>
			</div>
		</div>
		<Button class="w-full" type="submit">Login</Button>
	</form>
</div>
