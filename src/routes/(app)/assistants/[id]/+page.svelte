<script lang="ts">
	import EditAssistant from '$lib/components/forms/edit-assistant.svelte';
	export let data;
</script>

<svelte:head>
	<title>Edit Assistant</title>
</svelte:head>

<div class="flex w-full flex-col items-center">
	<EditAssistant form={data.form} />
</div>
