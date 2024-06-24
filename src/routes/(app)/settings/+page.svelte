<script lang="ts">
	import EditProfile from '$lib/components/forms/edit-profile.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editProfileFormSchema, type EditProfileFormType } from '$lib/schemas';
	import { superForm, type FormPath, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data;

	interface Field {
		label: string;
		name: FormPath<Infer<EditProfileFormType>>;
	}

	let loading = false;

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

	const form = superForm(data.form, {
		validators: zodClient(editProfileFormSchema)
	});

	const { form: formData, delayed } = form;
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<EditProfile form={data.form} />

<!-- <div class="flex w-full flex-col items-center">
	<form class="mx-auto min-w-[640px]" method="POST">
		{#each fields as { name, label } (name)}
			<Form.Field {form} {name}>
				<Form.Control let:attrs>
					<Form.Label>{label}</Form.Label>
					<Input {...attrs} bind:value={$formData[name]} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{/each}
		<Form.Button disabled={loading}>
			{#if $delayed}
				Updating...
			{:else}
				Edit Profile
			{/if}
		</Form.Button>
	</form>
</div> -->
