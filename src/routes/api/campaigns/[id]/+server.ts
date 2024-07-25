import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, params, locals }) {
	const { data, error } = await locals.supabaseServiceRole
		.from('campaigns')
		.delete()
		.eq('campaignid', params.id);

		if (error) {
			return json({ error: error.message }, { status: 500 });
		}
		
		return json({ success: true, data });
}
