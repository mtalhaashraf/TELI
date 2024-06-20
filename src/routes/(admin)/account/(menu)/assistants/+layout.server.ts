import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"
import { VAPI_AUTH_TOKEN } from "$env/static/private"

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, "/login")
  }

  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${VAPI_AUTH_TOKEN}` },
  }

  let assistants
  try {
    const response = await fetch("https://api.vapi.ai/assistant", options)
    assistants = await response.json()

    // assistants = assistants.map(
    //   (assistant: {
    //     id: string
    //     name: string
    //     createdAt: string
    //     updatedAt: string
    //     firstMessage: string
    //     voicemailMessage: string
    //   }) => ({
    //     id: assistant.id,
    //     name: assistant.name,
    //     createdAt: assistant.createdAt,
    //     updatedAt: assistant.updatedAt,
    //     firstMessage: assistant.firstMessage,
    //     voicemailMessage: assistant.voicemailMessage,
    //   }),
    // )
  } catch (err) {
    console.error("API request error:", err)
    assistants = null
  }

  return { session, assistants }
}
