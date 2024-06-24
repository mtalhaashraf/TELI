// src/routes/+page.server.ts
import { editCampaignFormSchema } from '$lib/schemas';
import { assistant } from '$lib/vapi/index.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { supabaseServiceRole, getSession }, params }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const assistants = await assistant.get();

	return {
		assistants: assistants.map((e: any) => ({
			id: e.id,
			name: e.name,
			firstMessage: e.firstMessage
		}))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { user } = await event.locals.getSession();

		if (!user) {
			redirect(303, '/auth');
		}

		const form = await superValidate(event, zod(editCampaignFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { startdate, enddate, Assistant, ...rest } = form.data;

		const newcampaigns = {
			assistant: Assistant.label,
			assistID: Assistant.value,
			clientid: 16, //assming id for client
			...rest
		};

		const { error } = await event.locals.supabaseServiceRole.from('campaigns').insert(newcampaigns);

		if (error) {
			console.log(error);
			return fail(400, { form });
		}

		redirect(303, '/campaigns');
	}
};
