import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const { user, session } = await getSession();

	if (!user || !session) {
		redirect(303, '/auth');
	}

	const { data: profile } = await supabase.from('profiles').select(`*`).eq('id', user?.id).single();

	return {
		profile,
		session
	};
};
