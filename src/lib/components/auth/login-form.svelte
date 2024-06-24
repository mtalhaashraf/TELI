<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { loginFormSchema, type LoginFormType } from '$lib/schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<LoginFormType>>;

	const form = superForm(data, {
		validators: zodClient(loginFormSchema)
	});

	const { form: formData, enhance } = form;

	let isLoading = false;

	async function handleSubmit(event: any) {
		isLoading = true;
		try {
			await enhance(event);
			// Handle successful submission here
		} catch (error) {
			// Handle error here
		} finally {
			isLoading = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="mx-auto" method="POST" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button disabled={isLoading}>
		{#if isLoading}
			Loading...
		{:else}
			Login
		{/if}
	</Form.Button>
</form>
