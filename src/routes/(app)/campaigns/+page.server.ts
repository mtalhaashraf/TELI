import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../../$types';

export const load: LayoutServerLoad = async (props) => {
	const {
		locals: { supabaseServiceRole, getSession },
		depends
	} = props;

	console.log('Getting campaigns data...');

	const session = await getSession();

	if (!session) {
		throw redirect(303, '/auth');
	}

	const { data: campaigns } = await supabaseServiceRole.from('campaigns').select(`*`);
	return { campaigns };
};
