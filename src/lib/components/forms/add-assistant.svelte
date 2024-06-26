<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editAssistantFormSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Textarea from '../ui/textarea/textarea.svelte';

	let form = {
		name : '',
		firstMessage: '',
		systemPrompt: ''
	}
	const superFormData = superForm(form, {
		validators: zodClient(editAssistantFormSchema)
	});

	const { form: formData } = superFormData;

</script>

<div class="flex w-full flex-col items-center">
	<form class="mx-auto min-w-[640px]" method="POST" >
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
				<Textarea {...attrs} bind:value={$formData.systemPrompt} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Save</Form.Button>
	</form>
</div>
\