import { SupabaseClient, Session, type User } from '@supabase/supabase-js';
import { Database } from './types/supabase';
import type { RightPermissions } from './types/right-permissions.type';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			supabaseServiceRole: SupabaseClient<Database>;
			getSession(): Promise<{ session: Session | null; user: User | null }>;
		}
		interface PageData {
			supabase: SupabaseClient<Database>;
			session: Session | null;
			permissions: RightPermissions
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
