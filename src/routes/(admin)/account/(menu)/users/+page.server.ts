import { fail, redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "../../$types"

export const load: LayoutServerLoad = async (props) => {
  const {
    locals: { supabaseServiceRole, getSession },
  } = props
  const session = await getSession()

  if (!session) {
    throw redirect(303, "/login")
  }

  const { data: profiles } = await supabaseServiceRole
    .from("profiles")
    .select(`*`)

  return { profiles }
}
