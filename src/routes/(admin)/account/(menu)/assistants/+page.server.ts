import { fail, redirect } from "@sveltejs/kit"
import { VAPI_AUTH_TOKEN } from "$env/static/private"

export const actions = {
  update: async ({ request, locals: { getSession } }) => {
    const session = await getSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()

    const id = formData.get("id")
    const value = formData.get("name")

    const body = JSON.stringify({
      name: value,
    })

    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${VAPI_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: body,
    }

    try {
      const response = await fetch(
        `https://api.vapi.ai/assistant/${id}`,
        options,
      )
      const data = await response.json()
      if (!response.ok) {
        return fail(response.status, { error: data })
      }

      return {
        success: true,
        data,
      }
    } catch (err) {
      return fail(500, { error: "Internal Server Error" })
    }
  },
}
