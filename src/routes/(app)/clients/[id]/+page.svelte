<script lang="ts">
	import EditClient from '$lib/components/forms/edit-client.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { ArrowLeft } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let data;

	function navigateHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Update Client</title>
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
	<EditClient form={data.form} />
</div>
