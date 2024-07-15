import { redirect } from '@sveltejs/kit';
import {Permissions} from '$lib/store/permissionStore'
export const load = async ({ locals: { supabase, getSession, supabaseServiceRole } }) => {
	const { user, session } = await getSession();

	if (!user || !session) {
		redirect(303, '/auth');
	}

	const { data: roleData, error: roleError } = await supabaseServiceRole
		.from('users')
		.select('*')
		.eq('id', user.id)
		.single();
		
		if (roleError || !roleData) {
			return { session, user, permissions: null };
		}
		const userRole = roleData.rights;
        // console.log('User Role:', userRole);

			let permissions: {};
			if (userRole === 'Admin') {
				permissions = Permissions.AdminPermission;
			} else if (userRole === 'Sales Manager') {
				permissions = Permissions.SaleManagerPermission;
			} else if (userRole === 'Sales Person') {
				permissions = Permissions.SalePersonPermission;
			}

			console.log(permissions)
			
	const { data: client } = await supabase.from('clients').select(`*`).eq('id', user?.id).single();
	return {
		client,
		session,
		permissions
	};
};
