import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"
import { VAPI_AUTH_TOKEN } from "$env/static/private"

export const load: LayoutServerLoad = async ({
  locals: { supabaseServiceRole, getSession },
}) => {
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
  } catch (err) {
    console.error("API request error:", err)
    assistants = null
  }

  let campaigns
  try {
    const { data, error } = await supabaseServiceRole
      .from("campaigns")
      .select(`*`)
    campaigns = data

    if (error) {
      throw error
    }
  } catch (err) {
    console.error("Supabase query error:", err)
    campaigns = null
  }

  return { session, campaigns, assistants }
}
