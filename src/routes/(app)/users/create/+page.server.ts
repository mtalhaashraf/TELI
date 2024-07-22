// src/routes/+page.server.ts
import { addUserFormSchema } from '$lib/schemas';
import { fail, json, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { Rights } from '../../../../types/right-permissions.type';

export const load = async ({ locals: { supabaseServiceRole, getSession }, parent }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const { permissions } = await parent();

	const { data: clients } = await supabaseServiceRole.from('clients').select('*');

	let form;

	if (permissions.rights == Rights.SALES_MANAGER) {
		const client = clients?.find((e) => e.id.toString() == permissions.users.client);

		if (client) {
			form = await superValidate(
				{
					rights: {
						value: Rights.SALES_PERSON,
						label: Rights.SALES_PERSON
					},
					client: {
						value: client.id.toString(),
						label: client.full_name
					}
				},
				zod(addUserFormSchema)
			);
		} else {
			form = await superValidate(
				{
					rights: {
						value: Rights.SALES_MANAGER
					}
				},
				zod(addUserFormSchema)
			);
		}
	} else {
		form = await superValidate(zod(addUserFormSchema));
	}

	return {
		form,
		clients: clients?.map((e) => ({ value: e.id.toString(), label: e.full_name }))
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('Event Triggered');
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

		const authUser = {
			email: form.data.company_email,
			password: form.data.password
		};

		const { error: createUserError, data: authUserData } =
			await event.locals.supabaseServiceRole.auth.admin.createUser({
				...authUser,
				user_metadata: {
					name: form.data.full_name
				},
				email_confirm: true
			});

		if (createUserError) {
			console.log(createUserError);
			return fail(400, { form });
		}

		const { error: insertError } = await event.locals.supabaseServiceRole
			.from('users')
			.update({
				avatar_url: null,
				cell: form.data.cell,
				client_id: parseInt(form.data.client.value),
				email2: form.data.email2,
				rights: form.data.rights.value,
				full_name: form.data.full_name,
				phone: form.data.phone,
				status: form.data.status.value
			})
			.eq('id', authUserData?.user.id);

		if (createUserError || insertError) {
			console.log(createUserError || insertError);
			return fail(400, { form });
		}

		redirect(303, '/users');
	}
};
