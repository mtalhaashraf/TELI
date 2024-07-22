// src/routes/+page.server.ts
import { editClientFormSchema } from '$lib/schemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { supabase, getSession } }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const { data } = await supabase.from('clients').select('*').eq('id', user.id).single();

	const form = await superValidate((data as any) || {}, zod(editClientFormSchema));

	// console.log(form);
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

		const form = await superValidate(event, zod(editClientFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await event.locals.supabase
			.from('clients')
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
