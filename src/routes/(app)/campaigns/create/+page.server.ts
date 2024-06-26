// src/routes/+page.server.ts
import { addCampaignFormSchema } from '$lib/schemas';
import { assistant } from '$lib/vapi/index.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { supabaseServiceRole, getSession }}) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const assistants = await assistant.get();

	const { data: profiles, error } = await supabaseServiceRole
		.from('profiles')
		.select('*')

	if (error) {
		console.error('Error fetching profile:', error);
	}

	return {
		profiles: profiles?.map((e: any) =>({
			id: e.clientID,
			name: e.full_name
		})),
		assistants: assistants.map((e: any) => ({
			id: e.id,
			name: e.name,
		}))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { user } = await event.locals.getSession();

		if (!user) {
			redirect(303, '/auth');
		}

		const form = await superValidate(event, zod(addCampaignFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		
		console.log(form);
		
		const {Profile, Assistant, ...rest } = form.data;
		
		const newcampaigns = {
			assistant: Assistant.label,
			assistID: Assistant.value,
			clientid: Number(Profile.value),
			...rest
		};
		
		const { error } = await event.locals.supabaseServiceRole
			.from('campaigns')
			.insert(newcampaigns);

		if (error) {
			console.log(error);
			return fail(400, { form });
		}

		redirect(303, '/campaigns');
	}
};
