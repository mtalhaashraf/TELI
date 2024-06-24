// src/routes/+page.server.ts
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { loginFormSchema } from '$lib/schemas';

export const load = async ({ locals: { getSession } }) => {
	const { user, session } = await getSession();
	if (user || session) {
		redirect(303, '/statistics');
	}

	return {
		form: await superValidate(zod(loginFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { data } = form;
		const res = await event.locals.supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password
		});

		if (!res.error) {
			redirect(303, '/statistics');
		} else {
			return {
				form
			};
		}
	}
};
