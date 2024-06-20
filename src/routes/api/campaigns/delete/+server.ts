import { redirect } from "@sveltejs/kit"

export async function DELETE({
  request,
  locals: { supabaseServiceRole, getSession },
}) {
  const session = await getSession()

  if (!session) {
    throw redirect(303, "/login")
  }

  try {
    const body = await request.json()
    const campaignid = parseInt(body.campaignid)

    if (isNaN(campaignid)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid campaign ID",
        }),
        { status: 400 },
      )
    }

    const { data, error } = await supabaseServiceRole
      .from("campaigns")
      .delete()
      .eq("campaignid", campaignid)

    if (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message,
        }),
        { status: 500 },
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Campaign deleted successfully",
        data,
      }),
      { status: 200 },
    )
  } catch (error) {
    console.error("Error deleting campaign:", error)
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to delete campaign",
        error: error?.message,
      }),
      { status: 500 },
    )
  }
}
