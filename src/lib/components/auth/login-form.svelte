<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { loginFormSchema, type LoginFormType } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<LoginFormType>>;

	let loading = false;

	const form = superForm(data, {
		validators: zodClient(loginFormSchema),
		onSubmit: () => {
			loading = true;
		},
		onResult: ({ result }: any) => {
			if (result?.data && result?.data?.message) {
				toast.error(result?.data?.message || 'Internal Error');
			}
			loading = false;
		},
		onError: ({ result }) => {
			console.log(result);
			loading = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

<form class="mx-auto" method="POST" use:enhance>
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
	<Form.Button disabled={loading}>
		{#if loading}
			Loading...
		{:else}
			Login
		{/if}
	</Form.Button>
</form>
