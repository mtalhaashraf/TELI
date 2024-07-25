import { json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, locals }) {
	const { data, error } = await locals.supabaseServiceRole
		.from('clients')
		.delete()
		.eq('id', params.id);

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}
	
	return json({ success: true, data });
}
