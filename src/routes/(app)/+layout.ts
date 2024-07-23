import { redirect } from '@sveltejs/kit';
import type { Database } from '../../types/supabase';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { RightPermissions } from '../../types/right-permissions.type';

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

	// Protect routes
	const path = (url.pathname as string)?.replace('/', '');

	const defaultPath = '/statistics';

	if (!(data.permissions as RightPermissions)[path.split('/')[0]]) {
		redirect(303, defaultPath);
	}

	return { session, supabase, permissions: data.permissions as RightPermissions };
};
