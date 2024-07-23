<script lang="ts">
	import { goto } from '$app/navigation';
	import EditProfile from '$lib/components/forms/edit-profile.svelte';

	export let data;

	function navigateHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="flex w-full flex-col items-center">
	<EditProfile form={data.form} clients={data.clients} />
</div>
