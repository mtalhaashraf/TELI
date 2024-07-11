<script lang="ts">
	import { goto } from '$app/navigation';
	import AddUser from '$lib/components/forms/add-user.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	export let data;

	function navigateHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Add User</title>
</svelte:head>
<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link asChild let:attrs>
				<a class="cursor-pointer" href="/" {...attrs} on:click|preventDefault={navigateHome}>
					Home
				</a>
			</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>Form</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
<div class="flex w-full flex-col items-center">
	<AddUser form={data.form} clients={data.clients} />
</div>
