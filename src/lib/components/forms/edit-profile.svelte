<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editProfileFormSchema, type EditProfileFormType } from '$lib/schemas';
	import { superForm, type FormPath, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let form;

	const superFormData = superForm(form, {
		validators: zodClient(editProfileFormSchema)
	});

	const { form: formData } = superFormData;

	interface Field {
		label: string;
		name: FormPath<Infer<EditProfileFormType>>;
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
			label: 'Secondary Email',
			name: 'email2'
		},
		{
			label: 'Status',
			name: 'status'
		}
	];
</script>

<div class="flex w-full flex-col items-center">
	<form class="mx-auto min-w-[640px]" method="POST">
		{#each fields as { name, label } (name)}
			<Form.Field form={superFormData} {name}>
				<Form.Control let:attrs>
					<Form.Label>{label}</Form.Label>
					<Input {...attrs} bind:value={$formData[name]} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{/each}
		<Form.Button>Edit User</Form.Button>
	</form>
</div>
