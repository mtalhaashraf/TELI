<script lang="ts">
	import AddClient from '$lib/components/forms/add-client.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { ArrowLeft } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let data;
	console.log('accessing /clients/create');
	function navigateHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Add Client</title>
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
	<AddClient form={data.form} />
</div>
