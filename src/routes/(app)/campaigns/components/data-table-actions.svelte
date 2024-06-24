<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import UploadFile from './upload-file.svelte';

	export let id: any;

	let show = false;

	const handleUploadFile = () => {
		show = true;
	};

	const handleEdit = () => {
		console.log(id);
		goto('/campaigns/' + id);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={handleEdit}>Edit</DropdownMenu.Item>
		<!-- <DropdownMenu.Item>Delete</DropdownMenu.Item> -->
		<DropdownMenu.Item on:click={handleUploadFile}>Upload File</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<UploadFile campaignId={id} {show} />
