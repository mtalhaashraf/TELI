// src/routes/+page.server.ts
import { addCampaignFormSchema } from '$lib/schemas';
import { assistant } from '$lib/vapi/index.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Database } from '../../../../types/supabase.js';
import { Rights, type RightPermissions } from '../../../../types/right-permissions.type.js';

export const load = async ({ locals: { supabaseServiceRole, getSession }, parent }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const { permissions }: { permissions: RightPermissions } = await parent();

	if (!permissions.campaigns?.actions?.add) {
		redirect(303, '/statistics');
	}

	const assistants = await assistant.get();

	const { data: clients, error } = await supabaseServiceRole.from('clients').select('*');

	console.log(permissions);

	if (error) {
		console.error('Error fetching profile:', error);
	}

	let form;

	const client = clients?.find((e) => e.id.toString() == permissions?.campaigns?.client);

	if (permissions.rights == Rights.SALES_MANAGER && permissions.campaigns.client && client) {
		form = await superValidate(
			{
				Client: {
					value: client.id.toString(),
					label: client.full_name
				}
			} as any,
			zod(addCampaignFormSchema)
		);
	} else {
		form = await superValidate(zod(addCampaignFormSchema));
	}

	return {
		form,
		clients: clients?.map((e: any) => ({
			value: e.id.toString(),
			label: e.full_name
		})),
		assistants: assistants.map((e: any) => ({
			value: e.id,
			label: e.name
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

		const { Client, Assistant, startdate, enddate, campaignname, ...rest } = form.data;

		const newCampaign: Database['public']['Tables']['campaigns']['Insert'] = {
			assistant: Assistant.label,
			assistID: Assistant.value,
			client_id: Number(Client.value),
			startdate: startdate ? new Date(startdate).toISOString() : null,
			enddate: enddate ? new Date(enddate).toISOString() : null,
			campaignname: campaignname,
			...rest
		};

		console.log('Insert Campaign: ', Client, newCampaign);

		const { error } = await event.locals.supabaseServiceRole.from('campaigns').insert(newCampaign);

		if (error) {
			console.log(error);
			return fail(400, { form });
		}

		redirect(303, '/campaigns');
	}
};
