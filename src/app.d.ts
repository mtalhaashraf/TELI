import { SupabaseClient, Session, type User } from '@supabase/supabase-js';
import { Database } from './types/supabase';
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
			profile: Database.public.profiles.Row;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
