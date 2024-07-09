import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, params, locals }) {
	const { data, error } = await locals.supabaseServiceRole
		.from('clients')
		.delete()
		.eq('id', params.id);

	console.log(error);

	return json(data);
}
