<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import UploadFile from './upload-file.svelte';
	import { page } from '$app/stores';

//	export let permissions: any;
	export let clientid: any;
	export let id: any;
	// console.log(id, clientid);
	// let show = false;

	const handleUploadFile = () => {
		const url = `https://test-teli-bot.azurewebsites.net/?ClientID=${clientid}&CampaignID=${id}`;
		window.open(url, '_blank');
	};

	const handleEdit = () => {
		console.log(id);
		goto('/campaigns/' + id);
	};

	const handleDelete = async () => {
		const response = await fetch(`/api/campaigns/${id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			// Reload the page after a successful delete
			window.location.reload();
		} else {
			const error = await response.json();
			console.error('Error deleting client:', error);
		}
	};

	function reloadPage() {
		const thisPage = window.location.pathname;

		goto('/').then(() => goto(thisPage));
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#if $page.data.permissions.campaigns?.actions?.update}
			<DropdownMenu.Item on:click={handleEdit}>Edit</DropdownMenu.Item>
		{/if}
		{#if $page.data.permissions.campaigns?.actions?.delete}
			<DropdownMenu.Item on:click={handleDelete}>Delete</DropdownMenu.Item>
		{/if}
		{#if $page.data.permissions.campaigns?.actions?.upload_file}
			<DropdownMenu.Item on:click={handleUploadFile}>Upload File</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- <UploadFile campaignId={id} {show} /> -->
