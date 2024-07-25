import { assistant } from '$lib/vapi/index.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, params, locals }) {
	try {
		const res = await assistant.delete(params.id);
		console.log(res);
		return json({ success: true, res });
	} catch (error) {
		console.log(error);
		return json({ error: error.message }, { status: 500 });
	}
	
}
