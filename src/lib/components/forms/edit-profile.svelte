<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editUserFormSchema, type EditUserFormType } from '$lib/schemas';
	import { superForm, type FormPath, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '../ui/select';
	import { page } from '$app/stores';

	export let form;
	export let clients;

	let loading = false;

	let rights = ['Admin', 'Sales Manager', 'Sales Person'];
	let statuses = ['Active', 'Not Active'];
	const superFormData = superForm(form, {
		validators: zodClient(editUserFormSchema),
		dataType: 'json',
		onSubmit: () => {
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

	interface Field {
		label: string;
		name: FormPath<Infer<EditUserFormType>>;
		readonly?: boolean;
		type?: string;
		options?: {
			value: string;
			label: string;
		}[];
	}

	const fields: Field[] = [
		{
			label: 'Name',
			name: 'full_name'
		},
		{
			label: 'Primary Email',
			name: 'company_email',
			readonly: true
		},
		{
			label: 'Client',
			name: 'client',
			type: 'dropdown',
			options: clients,
			readonly: !$page.data.permissions?.profile.actions.client
		},
		{
			label: 'Phone',
			name: 'phone'
		},
		{
			label: 'Mobile',
			name: 'cell'
		},
		{
			label: 'Secondary Email',
			name: 'email2'
		},
		{
			label: 'Rights',
			name: 'rights',
			type: 'dropdown',
			options: rights.map((e) => ({
				value: e,
				label: e
			})),
			readonly: !$page.data.permissions?.profile.actions.rights
		},
		{
			label: 'Status',
			name: 'status',
			type: 'dropdown',
			options: statuses.map((e) => ({
				value: e,
				label: e
			})),
			readonly: !$page.data.permissions?.profile.actions.status
		}
	];
</script>

<div class="flex w-full flex-col items-center">
	<form class="mx-auto min-w-[640px]" method="POST" use:enhance>
		{#each fields as { name, label, readonly, type, options } (name)}
			{#if type == 'dropdown' && options && options?.length > 0}
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
			{:else}
				<Form.Field form={superFormData} {name}>
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Input {...attrs} bind:value={$formData[name]} disabled={readonly} {type} />
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
