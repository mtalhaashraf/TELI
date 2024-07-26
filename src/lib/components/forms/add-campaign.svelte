<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { addCampaignFormSchema, type AddCampaignFormType } from '$lib/schemas';
	import { superForm, type FormPath, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '../ui/select';
	import Textarea from '../ui/textarea/textarea.svelte';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';

	export let form;
	export let assistants;
	export let clients;

	let loading = false;

	const superFormData = superForm(form, {
		validators: zodClient(addCampaignFormSchema),
		dataType: 'json',
		onSubmit: () => {
			if (!allFieldsFilled()) {
				toast.error('Please fill in all fields');
				return false;
			}
			loading = true;
		},
		onResult: () => {
			loading = false;
		},
		onError: ({ result }) => {
			console.log(result);
			loading = false;
		}
	});

	const { form: formData, enhance, allErrors } = superFormData;

	function allFieldsFilled() {
		const { campaignname, Assistant, Client } = $formData;
		return campaignname && Assistant && Client;
	}

	interface Field {
		label: string;
		name: FormPath<Infer<AddCampaignFormType>>;
		type?: 'date' | 'textarea' | 'number' | 'dropdown';
		height?: number;
		readonly?: boolean;
		options?: {
			value: string;
			label: string;
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
				<Form.Field class="w-[200px]" form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Input {readonly} {...attrs} type="date" bind:value={$formData[name]} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{:else if type == 'dropdown' && options && options?.length > 0}
				<Form.Field form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Select.Root disabled={readonly} bind:selected={$formData[name]}>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select one" />
							</Select.Trigger>
							<Select.Content>
								{#each options as option (option.value)}
									<Select.Item value={option.value} label={option.label} />
								{/each}
							</Select.Content>
						</Select.Root>
						<!-- <input hidden bind:value={$formData[name]} name={attrs.name} /> -->
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
	<Form.Button disabled={loading}>
		{#if loading}
			Saving...
		{:else}
			Save
		{/if}
	</Form.Button>
</form>
