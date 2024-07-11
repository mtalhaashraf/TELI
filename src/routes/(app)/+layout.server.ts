import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const { user, session } = await getSession();

	if (!user || !session) {
		redirect(303, '/auth');
	}

	const { data: client } = await supabase.from('clients').select(`*`).eq('id', user?.id).single();
	return {
		client,
		session
	};
};
