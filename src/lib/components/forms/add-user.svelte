<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { addUserFormSchema, type AddUserFormType } from '$lib/schemas';
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
		validators: zodClient(addUserFormSchema),
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

	const { form: formData, enhance, errors } = superFormData;

	interface Field {
		label: string;
		name: FormPath<Infer<AddUserFormType>>;
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
			label: 'Clients',
			name: 'client',
			type: 'dropdown',
			options: clients,
			readonly: !$page.data.permissions.users?.actions?.add?.client
		},
		{
			label: 'Company Email',
			name: 'company_email'
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
			label: 'Password',
			name: 'password',
			type: 'password'
		},
		{
			label: 'Secondary Email',
			name: 'email2'
		},
		{
			label: 'Rights',
			name: 'rights',
			type: 'dropdown',
			readonly: !$page.data.permissions.users?.actions?.add?.rights,
			options: rights.map((e) => ({
				value: e,
				label: e
			}))
		},
		{
			label: 'Status',
			name: 'status',
			type: 'dropdown',
			readonly: !$page.data.permissions.users?.actions?.add?.status,
			options: statuses.map((e) => ({
				value: e,
				label: e
			}))
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
						<Input type={type || 'text'} {...attrs} bind:value={$formData[name]} {readonly} />
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
</div>
