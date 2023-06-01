<script lang="ts">
	import Calendar from '../components/Calendar.svelte'
	export let data
</script>

<div class="mt-12 px-3 md:mt-24 md:px-16">
	<Calendar username={data.user.username} />
</div>
