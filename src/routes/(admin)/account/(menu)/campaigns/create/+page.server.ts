import { redirect } from "@sveltejs/kit"

export const actions = {
  createCampaign: async ({
    request,
    locals: { supabaseServiceRole, getSession },
  }) => {
    const session = await getSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    try {
      const clientid = await supabaseServiceRole
        .from("profiles")
        .select("clientID")
        .eq("id", session.user.id)
        .single()

      if (clientid.error) {
        throw redirect(303, "/login")
      }

      const formData = await request.formData()
      const campaignData = {}

      campaignData.clientid = clientid.data.clientID

      for (const [key, value] of formData.entries()) {
        campaignData[key] = value
      }

      const { data, error } = await supabaseServiceRole
        .from("campaigns")
        .insert([campaignData])
        .select()
      if (error) {
        throw new Error(error.message)
      }

      return {
        status: 200,
        body: {
          success: true,
          message: "Campaign created successfully",
          data,
        },
      }
    } catch (error) {
      console.error("Error creating campaign:", error)
      return {
        status: 500,
        body: {
          success: false,
          message: "Failed to create campaign",
          error: error,
        },
      }
    }
  },
}
