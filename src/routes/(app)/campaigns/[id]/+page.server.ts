// src/routes/+page.server.ts
import { editCampaignFormSchema } from '$lib/schemas';
import { assistant } from '$lib/vapi/index.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { Rights, type RightPermissions } from '../../../../types/right-permissions.type';
import type { Database } from '../../../../types/supabase';

export const load = async ({ locals: { supabaseServiceRole, getSession }, params, parent }) => {
	const { user } = await getSession();

	if (!user) {
		redirect(303, '/auth');
	}

	const { permissions }: { permissions: RightPermissions } = await parent();

	if (!permissions.campaigns?.actions?.update) {
		redirect(303, '/statistics');
	}

	const assistants = await assistant.get();

	const { data } = await supabaseServiceRole
		.from('campaigns')
		.select('*')
		.eq('campaignid', params.id)
		.single();

	const { data: clients, error } = await supabaseServiceRole.from('clients').select('*');

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
	const { startdate, enddate, client_id, ...rest } = data;
	const formatedData = {
		startdate: startdate ? formatDate(data?.startdate) : '',
		enddate: enddate ? formatDate(data?.enddate) : '',
		...rest
	};

	let form;

	const client = clients?.find((e) => e.id.toString() == client_id?.toString());

	// if (permissions.rights == Rights.SALES_MANAGER && permissions.campaigns.client && client) {
	// 	form = await superValidate(
	// 		({
	// 			Assistant,
	// 			...formatedData,
	// 			Client: {
	// 				value: client?.id.toString(),
	// 				label: client?.full_name
	// 			}
	// 		} as any) || {},
	// 		zod(editCampaignFormSchema)
	// 	);
	// } else {
	// 	const client = clients?.find((e) => e.id.toString() == permissions?.campaigns?.client);

	// 	form = await superValidate(
	// 		({
	// 			Assistant,
	// 			...formatedData
	// 		} as any) || {},
	// 		zod(editCampaignFormSchema)
	// 	);
	// }

	form = await superValidate(
		({
			Assistant,
			...formatedData,
			Client: {
				value: client?.id.toString() || '',
				label: client?.full_name || ''
			}
		} as any) || {},
		zod(editCampaignFormSchema)
	);

	return {
		form: form,
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

		const form = await superValidate(event, zod(editCampaignFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { Client, Assistant, startdate, enddate, ...rest } = form.data;

		const newCampaign: Database['public']['Tables']['campaigns']['Update'] = {
			assistant: Assistant.label,
			assistID: Assistant.value,
			client_id: Number(Client.value),
			startdate: startdate ? new Date(startdate).toISOString() : null,
			enddate: enddate ? new Date(enddate).toISOString() : null,
			...rest
		};

		console.log('Update Campaign: ', newCampaign);

		const { error } = await event.locals.supabaseServiceRole
			.from('campaigns')
			.update(newCampaign)
			.eq('campaignid', event.params.id as string);

		if (error) {
			console.log(error);
			return fail(400, { form });
		}

		redirect(303, '/campaigns');
	}
};
