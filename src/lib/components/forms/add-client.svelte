<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { addClientFormSchema, type AddClientFormType } from '$lib/schemas';
	import { superForm, type FormPath, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let form: any = {
		full_name: '',
		company_name: '',
		website: '',
		phone: '',
		cell: '',
		email: '',
		status: ''
	};

	const superFormData = superForm(form, {
		validators: zodClient(addClientFormSchema)
	});

	const { form: formData } = superFormData;

	interface Field {
		label: string;
		name: FormPath<Infer<AddClientFormType>>;
		readonly?: boolean;
		type?: string; 
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
			name: 'phone'
		},
		{
			label: 'Mobile',
			name: 'cell'
		},
		{
			label: 'Email',
			name: 'email'
		},
		{
			label: 'Status',
			name: 'status'
		}
	];

	$: console.log($formData);
</script>

<div class="flex w-full flex-col items-center">
	<form class="mx-auto min-w-[640px]" method="POST">
		{#each fields as { name, label, readonly, type } (name)}
			<Form.Field form={superFormData} {name}>
				<Form.Control let:attrs>
					<Form.Label>{label}</Form.Label>
					<Input type={type || 'text'} {...attrs} bind:value={$formData[name]} {readonly} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{/each}
		<Form.Button>Save</Form.Button>
	</form>
</div>
