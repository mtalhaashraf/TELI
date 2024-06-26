<script lang="ts">
	import AddCampaign from '$lib/components/forms/add-campaign.svelte';
	export let data;
</script>

<svelte:head>
	<title>Add Campaign</title>
</svelte:head>

<div class="flex w-full flex-col items-center">
	<AddCampaign assistants={data.assistants} profiles={data.profiles} />
</div>
