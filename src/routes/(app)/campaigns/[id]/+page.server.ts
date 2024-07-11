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

	const { data } = await supabaseServiceRole
		.from('campaigns')
		.select('*')
		.eq('campaignid', params.id)
		.single();

	const Assistant = {
		value: data?.assistID,
		label: data?.assistant
	};
	function formatDate(dateString: any) {
		const date = new Date(dateString);
		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const day = String(date.getUTCDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	  }
	const {startdate, enddate, ...rest} = data
	const formatedData = {
		startdate: formatDate(data?.startdate),
		enddate: formatDate(data?.enddate),
		...rest
	}
	return {
		form: await superValidate(({ Assistant, ...formatedData } as any) || {}, zod(editCampaignFormSchema)),

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

		const form = await superValidate(event, zod(editCampaignFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { Assistant, ...rest } = form.data;

		console.log('Update Campaign: ', form.data);

		const newcampaigns = {
			assistant: Assistant.label,
			assistID: Assistant.value,
			...rest
		};

		const { error } = await event.locals.supabaseServiceRole
			.from('campaigns')
			.update(newcampaigns)
			.eq('campaignid', event.params.id as string);

		if (error) {
			console.log(error);
			return fail(400, { form });
		}

		redirect(303, '/campaigns');
	}
};
