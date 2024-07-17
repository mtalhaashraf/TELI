import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../../$types';

export const load: LayoutServerLoad = async (props) => {
	const {
		locals: { supabaseServiceRole, getSession }
	} = props;

	console.log('Getting campaigns data...');
	// console.log(data.permissions)
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/auth');
	}

	const { data: campaigns } = await supabaseServiceRole.from('campaigns').select(`*`);
	return { campaigns };
};
