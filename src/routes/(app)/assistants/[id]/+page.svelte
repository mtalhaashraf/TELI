<script lang="ts">
	import EditAssistant from '$lib/components/forms/edit-assistant.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { goto } from '$app/navigation';
	export let data;
	function navigateHome() {
		goto('/');
	}
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link asChild let:attrs>
				<a href="/" {...attrs} on:click|preventDefault={navigateHome}>
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
<svelte:head>
	<title>Edit Assistant</title>
</svelte:head>

<div class="flex w-full flex-col items-center">
	<EditAssistant form={data.form} />
</div>
