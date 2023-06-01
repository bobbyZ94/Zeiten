<script lang="ts">
	import Calendar from '../components/Calendar.svelte'
	import {
		Drawer,
		Button,
		CloseButton,
		Label,
		Input,
		Textarea,
		P,
		A,
		Checkbox
	} from 'flowbite-svelte'
	import { sineIn } from 'svelte/easing'
	export let data

	let hidden3 = true
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}
	console.log(data.user.color)
</script>

<div class="mt-5 p-1">
	<Calendar username={data.user.username} />
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden3} id="sidebar3">
	<div class="flex items-center">
		<h5
			id="drawer-label"
			class="mb-6 inline-flex items-center text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
		>
			<svg
				class="mr-2 h-5 w-5"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
					clip-rule="evenodd"
				/></svg
			>Contact us
		</h5>
		<CloseButton on:click={() => (hidden3 = true)} class="mb-4 dark:text-white" />
	</div>
	<form action="#" class="mb-6">
		<div class="mb-6">
			<Label for="email" class="mb-2 block">Your email</Label>
			<Input id="email" name="email" required placeholder="name@company.com" />
		</div>
		<div class="mb-6">
			<Label for="subject" class="mb-2 block">Subject</Label>
			<Input id="subject" name="subject" required placeholder="Let us know how we can help you" />
		</div>
		<div class="mb-6">
			<Label for="message" class="mb-2">Your message</Label>
			<Textarea id="message" placeholder="Your message..." rows="4" name="message" />
		</div>
		<Button type="submit" class="w-full">Send message</Button>
	</form>
</Drawer>
