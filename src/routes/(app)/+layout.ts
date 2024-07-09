import { redirect } from '@sveltejs/kit';
import type { Database } from '../../types/supabase';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const load = async ({ fetch, data, depends, url }) => {
	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const client: Database['public']['Tables']['clients']['Row'] | null = data.client;

	const editclientPath = `/settings`;
	if (client && !_hasFullclient(client) && url.pathname !== editclientPath) {
		redirect(303, editclientPath);
	}

	return { client, session, supabase };
};

export const _hasFullclient = (
	client: Database['public']['Tables']['clients']['Row'] | null
) => {
	if (!client) {
		return false;
	}
	if (!client.full_name) {
		return false;
	}
	if (!client.company_name) {
		return false;
	}
	if (!client.website) {
		return false;
	}

	return true;
};
