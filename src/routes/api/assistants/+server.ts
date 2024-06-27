import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
	console.log(request.url);
	return json('ok');
}
