import { redirect } from "@sveltejs/kit"

export const actions = {
  updateCampaign: async ({
    request,
    locals: { supabaseServiceRole, getSession },
  }) => {
    const session = await getSession()

    if (!session) {
      throw redirect(303, "/login")
    }

    try {
      const formData = await request.formData()
      const campaignData = {}

      for (const [key, value] of formData.entries()) {
        if (key === "assistID" || key === "clientid" || key === "campaignid") {
          campaignData[key] = parseInt(value)
        } else {
          campaignData[key] = value
        }
      }

      const { data, error } = await supabaseServiceRole
        .from("campaigns")
        .update([campaignData])
        .eq("campaignid", campaignData.campaignid)
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
