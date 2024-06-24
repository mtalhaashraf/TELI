// src/routes/+page.server.ts
import { editProfileFormSchema } from '$lib/schemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { supabaseServiceRole, getSession }, params }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const { data, error } = await supabaseServiceRole
		.from('profiles')
		.select('*')
		.eq('id', params.id)
		.single();

	if (error || !data) {
		redirect(303, '/auth');
	}

	const form = await superValidate((data as any) || {}, zod(editProfileFormSchema));

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

		const form = await superValidate(event, zod(editProfileFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await event.locals.supabaseServiceRole
			.from('profiles')
			.update(form.data)
			.eq('id', event.params.id as string);

		if (error) {
			return fail(400, { form });
		}

		redirect(303, '/users');
	}
};
