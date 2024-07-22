import { redirect } from '@sveltejs/kit';
import { Rights, type RightPermissions } from '../../types/right-permissions.type';
import {
	admin_permissions,
	default_permissions,
	sales_manager_permissions,
	sales_person_permissions
} from '$lib/permissions';
export const load = async ({ locals: { supabase, getSession, supabaseServiceRole } }) => {
	const { user, session } = await getSession();

	if (!user || !session) {
		redirect(303, '/auth');
	}

	const { data, error } = await supabaseServiceRole
		.from('users')
		.select('*')
		.eq('id', user.id)
		.single();

	if (error || !data) {
		return { session, user, permissions: null };
	}
	const rights = data.rights;
	let permissions: RightPermissions;
	if (rights === Rights.ADMIN) {
		permissions = admin_permissions;
	} else if (rights === Rights.SALES_MANAGER) {
		permissions = {
			...sales_manager_permissions,
			users: {
				...sales_manager_permissions.users,
				client: data.client_id.toString()
			},
			campaigns: {
				...sales_manager_permissions.campaigns,
				client: data.client_id.toString()
			}
		};
	} else if (rights === Rights.SALES_PERSON) {
		permissions = {
			...sales_person_permissions,
			campaigns: {
				client: data.client_id.toString()
			}
		};
	} else {
		permissions = default_permissions;
	}

	// const { data: client } = await supabase.from('clients').select(`*`).eq('id', user?.id).single();
	return {
		// client,

		session,
		permissions
	};
};
