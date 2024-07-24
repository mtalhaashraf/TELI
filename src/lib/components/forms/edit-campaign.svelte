<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editCampaignFormSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Textarea from '../ui/textarea/textarea.svelte';
	import * as Select from '../ui/select';
	import { readonly } from 'svelte/store';
	import { page } from '$app/stores';

	export let form;
	export let assistants;
	export let clients;

	const superFormData = superForm(form, {
		validators: zodClient(editCampaignFormSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = superFormData;

	interface Field {
		label: string;
		name: string;
		type?: 'date' | 'textarea' | 'number' | 'dropdown';
		height?: number;
		readonly?: boolean;
		options?: {
			id: string;
			name: string;
		}[];
	}

	const fields: Field[] = [
		{
			label: 'Campaign Name',
			name: 'campaignname'
		},
		{
			label: 'Start Date',
			name: 'startdate',
			type: 'date'
		},
		{
			label: 'End Date',
			name: 'enddate',
			type: 'date'
		},
		{
			label: 'Assistant',
			name: 'Assistant',
			type: 'dropdown',
			options: assistants
		},
		{
			label: 'Client',
			name: 'Client',
			type: 'dropdown',
			options: clients,
			readonly: !!$page.data.permissions.campaigns?.client
		},
		{
			label: 'Sales Manager Script',
			name: 'script',
			type: 'textarea',
			height: 300
		},
		{
			label: 'Desired Outcome',
			name: 'desiredoutcome'
		},
		{
			label: 'Description',
			name: 'description',
			type: 'textarea'
		}
	];
</script>

<form class="mx-auto min-w-[640px]" method="POST" use:enhance>
	{#each fields as { name, label, type, height, readonly, options } (name)}
		{#if type}
			{#if type == 'date'}
				<Form.Field form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Input {...attrs} {readonly} type="date" bind:value={$formData[name]} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{:else if type == 'dropdown' && options && options?.length > 0}
				<Form.Field form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Select.Root disabled={readonly} bind:selected={$formData[name]}>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select a {name}" />
							</Select.Trigger>
							<Select.Content>
								{#each options as { id, name } (id)}
									<Select.Item value={id} label={name} />
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData[name]} name={attrs.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{:else if type == 'number'}
				<Form.Field form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Input {...attrs} {readonly} bind:value={$formData[name]} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{:else if type == 'textarea'}
				<Form.Field form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						{#if height}
							<Textarea class="h-[300px]" {...attrs} {readonly} bind:value={$formData[name]} />
						{:else}
							<Textarea {...attrs} {readonly} bind:value={$formData[name]} />
						{/if}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{/if}
		{:else}
			<Form.Field form={superFormData} {name}>
				<Form.Control let:attrs>
					<Form.Label>{label}</Form.Label>
					<Input {...attrs} {readonly} bind:value={$formData[name]} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{/if}
	{/each}
	<Form.Button>Save</Form.Button>
</form>
