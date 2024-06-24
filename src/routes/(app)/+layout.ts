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

	const profile: Database['public']['Tables']['profiles']['Row'] | null = data.profile;

	const editProfilePath = `/settings`;
	if (profile && !_hasFullProfile(profile) && url.pathname !== editProfilePath) {
		redirect(303, editProfilePath);
	}

	return { profile, session, supabase };
};

export const _hasFullProfile = (
	profile: Database['public']['Tables']['profiles']['Row'] | null
) => {
	if (!profile) {
		return false;
	}
	if (!profile.full_name) {
		return false;
	}
	if (!profile.company_name) {
		return false;
	}
	if (!profile.website) {
		return false;
	}

	return true;
};
