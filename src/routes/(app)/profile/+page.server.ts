// src/routes/+page.server.ts
import { editClientFormSchema, editUserFormSchema } from '$lib/schemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { supabaseServiceRole, getSession } }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const { data: _User, error } = await supabaseServiceRole
		.from('users')
		.select('*')
		.eq('id', user.id)
		.single();

	const clients = (await supabaseServiceRole.from('clients').select('*'))?.data?.map((e: any) => ({
		value: e.id.toString(),
		label: e.full_name
	}));

	if (error || !_User) {
		redirect(303, '/auth');
	}

	const client = {
		value: _User?.client_id?.toString(),
		label: clients?.find((e) => e?.value === _User?.client_id?.toString())?.label
	};
	const rights = {
		value: _User?.rights,
		label: _User?.rights
	};
	const status = {
		value: _User?.status,
		label: _User?.status
	};

	const userData = {
		..._User,
		client,
		rights,
		status
	};

	console.log(userData);

	const form = await superValidate((userData as any) || {}, zod(editUserFormSchema));

	return {
		form,
		clients
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { user } = await event.locals.getSession();

		console.log('Updating user');

		if (!user) {
			redirect(303, '/auth');
		}

		const form = await superValidate(event, zod(editUserFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		console.log(form.data);

		const { error } = await event.locals.supabaseServiceRole
			.from('users')
			.update({
				avatar_url: null,
				cell: form.data.cell,
				client_id: parseInt(form.data.client.value),
				company_email: form.data.company_email,
				email2: form.data.email2,
				rights: form.data.rights.value,
				full_name: form.data.full_name,
				phone: form.data.phone,
				status: form.data.status.value,
				updated_at: new Date().toISOString()
			})
			.eq('id', user.id);

		if (error) {
			console.log(error);
			return fail(400, { form });
		}

		redirect(303, '/profile');
	}
};
