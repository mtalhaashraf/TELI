<script lang="ts">
	import EditCampaign from '$lib/components/forms/edit-campaign.svelte';
	export let data;
</script>

<svelte:head>
	<title>Edit Campaign</title>
</svelte:head>

<div class="flex w-full flex-col items-center">
	<EditCampaign assistants={data.assistants} form={data.form} />
</div>
