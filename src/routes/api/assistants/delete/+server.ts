import { redirect } from "@sveltejs/kit"
import { VAPI_AUTH_TOKEN } from "$env/static/private"

export async function DELETE({ request, locals: { getSession } }) {
  const session = await getSession()

  if (!session) {
    throw redirect(303, "/login")
  }

  try {
    const body = await request.json()
    const id = body.id

    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${VAPI_AUTH_TOKEN}` },
    }

    const response = await fetch(`https://api.vapi.ai/assistant/${id}`, options)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete campaign")
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Assistant deleted successfully",
        data,
      }),
      { status: 200 },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to delete campaign",
        error: error,
      }),
      { status: 500 },
    )
  }
}
