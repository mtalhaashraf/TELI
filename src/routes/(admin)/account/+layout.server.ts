import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({
  locals: { supabaseServiceRole, getSession },
}) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, "/login")
  }

  const { data: profile } = await supabaseServiceRole
    .from("profiles")
    .select(`*`)
    .eq("id", session.user.id)
    .single()

  return { session, profile }
}
