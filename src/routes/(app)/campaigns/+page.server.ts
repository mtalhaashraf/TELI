import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../../$types';
import type { Database } from '../../../types/supabase';
import { Rights, type RightPermissions } from '../../../types/right-permissions.type';

export const load: LayoutServerLoad = async (props) => {
	const {
		locals: { supabaseServiceRole, getSession },
		parent
	} = props;

	const { permissions } = (await parent()) as { permissions: RightPermissions };

	const session = await getSession();

	if (!session) {
		throw redirect(303, '/auth');
	}

	let campaigns: Database['public']['Tables']['campaigns']['Row'][] = [];

	if (permissions.rights == Rights.ADMIN) {
		campaigns = (await supabaseServiceRole.from('campaigns').select(`*`)).data;
	} else if (permissions.rights == Rights.SALES_MANAGER && permissions.campaigns.client) {
		campaigns = (
			await supabaseServiceRole
				.from('campaigns')
				.select(`*`)
				.eq('client_id', permissions.campaigns.client)
		).data;
	} else if (permissions.rights == Rights.SALES_PERSON && permissions.campaigns.client) {
		campaigns = (
			await supabaseServiceRole
				.from('campaigns')
				.select(`*`)
				.eq('client_id', permissions.campaigns.client)
		).data;
	} else {
		campaigns = [];
	}

	return { campaigns };
};
