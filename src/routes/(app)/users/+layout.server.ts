import { redirect } from '@sveltejs/kit';
import { Rights, type RightPermissions } from '../../../types/right-permissions.type';
import type { Database } from '../../../types/supabase';

export const load = async (props) => {
	const { locals, parent } = props;

	const { permissions } = (await parent()) as { permissions: RightPermissions };

	const { supabaseServiceRole, getSession } = locals;

	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	let users: Database['public']['Tables']['users']['Row'][] = [];
	let clients: Database['public']['Tables']['clients']['Row'][] = [];

	if (permissions.rights == Rights.ADMIN) {
		const { data: _users } = await supabaseServiceRole
			.from('users')
			.select('*')
			.neq('id', session.user.id);
		const { data: _clients } = await supabaseServiceRole.from('clients').select(`*`);
		users = _users;
		clients = _clients;
	} else if (
		permissions.rights == Rights.SALES_MANAGER &&
		permissions.users.client &&
		permissions.users.access_rights
	) {
		console.log('SALES MANAGER');
		const { data: _users } = await supabaseServiceRole
			.from('users')
			.select('*')
			.eq('client_id', permissions.users.client)
			.eq('rights', permissions.users.access_rights)
			.neq('id', session.user.id);

		const { data: _clients } = await supabaseServiceRole
			.from('clients')
			.select(`*`)
			.eq('id', permissions.users.client);
		users = _users;
		clients = _clients;
	} else {
		users = [];
		clients = [];
	}

	return {
		users: users
			?.filter((e) => e.id)
			?.filter((e) => e.id !== session?.user?.id)
			?.map((e) => {
				return {
					client: clients?.find((client) => client.id == e.client_id)?.full_name,
					...e
				};
			}),
		permissions
	};
};
