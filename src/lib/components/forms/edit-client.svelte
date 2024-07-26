<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editClientFormSchema, type EditClientFormType } from '$lib/schemas';
	import { superForm, type FormPath, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '../ui/select';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';


	export let form;

	let loading = false;

	let statuses = ['Active', 'Not Active'];

	const superFormData = superForm(form, {
		validators: zodClient(editClientFormSchema),
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

	const { form: formData, enhance } = superFormData;

	function allFieldsFilled() {
		const { full_name, company_name, website, phone, cell, email, status } = $formData;
		return full_name && company_name && website && phone && cell && email && status;
	}

	interface Field {
		label: string;
		name: FormPath<Infer<EditClientFormType>>;
		readonly?: boolean;
		type?: string;
		options?: {
			value: string;
			label: string;
		}[];
		show?: boolean;
	}

	const fields: Field[] = [
		{
			label: 'Name',
			name: 'full_name'
		},
		{
			label: 'Company Name',
			name: 'company_name'
		},
		{
			label: 'Company Website',
			name: 'website'
		},
		{
			label: 'Phone',
			name: 'phone',
			type: 'number'
		},
		{
			label: 'Mobile',
			name: 'cell',
			type: 'number'
		},
		{
			label: 'Email',
			name: 'email'
		},
		{
			label: 'Status',
			name: 'status',
			type: 'dropdown',
			options: statuses.map((e) => ({
				value: e,
				label: e
			}))
		}
	];
</script>

<div class="flex w-full flex-col items-center">
	<form class="mx-auto min-w-[640px]" method="POST" use:enhance>
		{#each fields as { name, label, readonly, type, options, show } (name)}
			{#if type == 'dropdown' && options && options?.length > 0}
				<Form.Field form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Select.Root bind:selected={$formData[name]}>
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
			{:else}
				<Form.Field form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Input {...attrs} bind:value={$formData[name]} {readonly} {type} />
						<!-- Use type attribute here -->
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{/if}
		{/each}
		<Form.Button disabled={loading}>
			{#if loading}
				Updating...
			{:else}
				Update
			{/if}
		</Form.Button>
	</form>
</div>
