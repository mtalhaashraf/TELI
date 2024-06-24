<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	export let id: any;

	const handleEdit = () => {
		console.log(id);
		goto('/assistants/' + id);
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
	</DropdownMenu.Content>
</DropdownMenu.Root>
