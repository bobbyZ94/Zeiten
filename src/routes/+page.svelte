<script lang="ts">
	import Calendar from '../components/Calendar.svelte'
	export let data
</script>

<div class="mt-12 p-2">
	<Calendar username={data.user.username} />
</div>
