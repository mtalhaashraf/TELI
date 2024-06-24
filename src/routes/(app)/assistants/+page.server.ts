import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../../$types';
import { assistant } from '$lib/vapi';

export const load: LayoutServerLoad = async (props) => {
	const {
		locals: { supabaseServiceRole, getSession }
	} = props;
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/auth');
	}

	const assistants = await assistant.get();

	return { assistants };
};
