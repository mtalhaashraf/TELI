<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { goto, invalidateAll } from '$app/navigation';

	export let id: string;

	const handleEdit = () => {
		goto('/users/' + id);
	};

	const handleDelete = async () => {
		const response = await fetch(`/api/users/${id}`, {
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
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={handleEdit}>Edit User</DropdownMenu.Item>
		<DropdownMenu.Item on:click={handleDelete}>Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
