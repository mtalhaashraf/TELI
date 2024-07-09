import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, params, locals }) {
	const { data, error } = await locals.supabaseServiceRole.auth.admin.deleteUser(params.id);

	console.log(error);

	return json(data);
}
