<script lang="ts">
	import { Input, Label, Button } from 'flowbite-svelte'
</script>

<div
	class="-z-20 flex h-full w-full items-center justify-center bg-cover"
	style="background-image: url(tall.jpg)"
>
	<form autocomplete="on" method="POST" action="?/login">
		<div class="mb-3 grid gap-6 rounded-xl bg-white p-8">
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
			<Button class="w-full" type="submit">Login</Button>
		</div>
	</form>
</div>
