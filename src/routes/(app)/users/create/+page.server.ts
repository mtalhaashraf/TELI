// src/routes/+page.server.ts
import { addUserFormSchema } from '$lib/schemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { supabaseServiceRole, getSession }, params }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const { data: clients } = await supabaseServiceRole.from('clients').select('*');

	const form = await superValidate(zod(addUserFormSchema));

	return {
		form,
		clients: clients?.map((e) => ({ value: e.id, label: e.full_name }))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { user } = await event.locals.getSession();

		if (!user) {
			redirect(303, '/auth');
		}

		const form = await superValidate(event, zod(addUserFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		console.log('Insert user: ', form.data);

		const authUser = {
			email: form.data.company_email,
			password: form.data.password
		};

		const { error: createUserError } =
			await event.locals.supabaseServiceRole.auth.admin.createUser(authUser);

		const { error: insertError } = await event.locals.supabaseServiceRole.from('users').insert({
			avatar_url: null,
			cell: form.data.cell,
			client_id: form.data.client.value,
			company_email: form.data.company_email,
			email2: form.data.email2,
			rights: form.data.rights.value,
			full_name: form.data.full_name,
			phone: form.data.phone,
			status: form.data.status.value
		});

		if (createUserError || insertError) {
			console.log(createUserError || insertError);
			return fail(400, { form });
		}

		redirect(303, '/users');
	}
};
