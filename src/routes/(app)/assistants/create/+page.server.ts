// src/routes/+page.server.ts
import { addAssistantFormSchema } from '$lib/schemas/add-assistant.js';
import { editAssistantFormSchema } from '$lib/schemas/edit-assistant.js';
import { assistant } from '$lib/vapi/index.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { getSession }, params }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	return {
		form: await superValidate(zod(addAssistantFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { user } = await event.locals.getSession();

		if (!user) {
			redirect(303, '/auth');
		}

		const form = await superValidate(event, zod(addAssistantFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { name, firstMessage, systemPrompt } = form.data;
		try {
			const res = await assistant.post({
				name,
				firstMessage,
				model: {
					model: '',
					provider: 'anyscale',
					messages: [
						{
							content: systemPrompt,
							role: 'system'
						}
					]
				}
			});
		} catch (error) {
			console.log(error);
			return fail(400, {
				form
			});
		}

		redirect(303, '/assistants');
	}
};
