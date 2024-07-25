<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	export let id: any;

	const handleEdit = () => {
		goto('/assistants/' + id);
	};

	const handleDelete = async () => {
		const response = await fetch(`/api/assistants/${id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			// Reload the page after a successful delete
			window.location.reload();
		} else {
			const error = await response.json();
			console.error('Error deleting assistant:', error);
		}
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
		<DropdownMenu.Item on:click={handleDelete}>Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
