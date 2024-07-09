import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../../$types';

export const load: LayoutServerLoad = async (props) => {
	const {
		locals: { supabaseServiceRole, getSession }
	} = props;
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const { data: users } = await supabaseServiceRole.from('users').select(`*`);
	const { data: clients } = await supabaseServiceRole.from('clients').select(`*`);

	return {
		users: users
			?.filter((e) => e.id)
			.map((e) => {
				return {
					client: clients?.find((client) => client.id == e.client_id)?.full_name,
					...e
				};
			})
	};
};
