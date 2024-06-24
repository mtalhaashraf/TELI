<script lang="ts">
	import EditProfile from '$lib/components/forms/edit-profile.svelte';
	export let data;
</script>

<svelte:head>
	<title>Update User</title>
</svelte:head>

<div class="flex w-full flex-col items-center">
	<EditProfile form={data.form} />
</div>
