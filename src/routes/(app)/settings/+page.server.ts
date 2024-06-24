// src/routes/+page.server.ts
import { editProfileFormSchema } from '$lib/schemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { supabase, getSession } }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();

	const form = await superValidate((data as any) || {}, zod(editProfileFormSchema));

	console.log(form);
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

		const { error } = await event.locals.supabase
			.from('profiles')
			.update(form.data)
			.eq('id', user.id);

		if (error) {
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
