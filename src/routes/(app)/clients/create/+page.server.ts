// src/routes/+page.server.ts
import { addClientFormSchema } from '$lib/schemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { supabaseServiceRole, getSession }, params }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const form = await superValidate(zod(addClientFormSchema));

	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { user } = await event.locals.getSession();

		if (!user) {
			redirect(303, '/auth');
		}

		const form = await superValidate(event, zod(addClientFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		console.log('Insert client: ', form.data);

		const { error } = await event.locals.supabaseServiceRole.from('clients').insert({
			...form.data,
			status: form.data.status.value
		});

		if (error) {
			console.log(error);
			return fail(400, { form });
		}

		redirect(303, '/clients');
	}
};
