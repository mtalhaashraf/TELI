<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editAssistantFormSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Textarea from '../ui/textarea/textarea.svelte';
	import { toast } from 'svelte-sonner';

	export let form;

	let loading = false;

	const superFormData = superForm(form, {
		validators: zodClient(editAssistantFormSchema),
		onSubmit: () => {
			if (!allFieldsFilled()) {
				toast.error('Please fill in all fields');
				return false;
			}
			loading = true;
		},
		onResult: ({ result }: any) => {
			if (result?.data && result?.data?.message) {
				toast(result?.data?.message || 'Internal Error');
			}
			loading = false;
		},
		onError: ({ result }) => {
			console.log(result);
			loading = false;
		}
	});

	const { form: formData, enhance } = superFormData;
	function allFieldsFilled() {
		const { name, firstMessage, systemPrompt } = $formData;
		return name && firstMessage && systemPrompt;
	}
</script>

<div class="flex w-full flex-col items-center">
	<form class="mx-auto min-w-[640px]" method="POST" use:enhance>
		<Form.Field form={superFormData} name="name">
			<Form.Control let:attrs>
				<Form.Label>Name</Form.Label>
				<Input {...attrs} bind:value={$formData.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field form={superFormData} name="firstMessage">
			<Form.Control let:attrs>
				<Form.Label>First Message</Form.Label>
				<Textarea {...attrs} bind:value={$formData.firstMessage} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field form={superFormData} name="systemPrompt">
			<Form.Control let:attrs>
				<Form.Label>System Prompt</Form.Label>
				<Textarea class="h-[500px]" {...attrs} bind:value={$formData.systemPrompt} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>
			{#if loading}
				Saving...
			{:else}
				Save
			{/if}
		</Form.Button>
	</form>
</div>
