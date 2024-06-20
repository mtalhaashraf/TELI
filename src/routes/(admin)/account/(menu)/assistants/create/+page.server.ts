import { fail, redirect } from "@sveltejs/kit"
import { VAPI_AUTH_TOKEN } from "$env/static/private"

export const actions = {
  add: async ({ request, locals: { getSession } }) => {
    const session = await getSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()

    const name = formData.get("name")
    const systemPrompt = formData.get("systemPrompt")
    const systemRole = formData.get("systemRole")
    const firstMessage = formData.get("firstMessage")
    const messages = [{ content: systemPrompt, role: systemRole }]
    const openaimodel = formData.get("openaimodel")
    const structuredDataSchema = formData.get("structuredDataSchema")

    const body = JSON.stringify({
      transcriber: { provider: "deepgram" },
      model: {
        provider: "openai",
        model: openaimodel,
        messages: messages,
        knowledgeBase: { provider: "canonical", fileIds: ["dummy"] },
      },
      voice: { provider: "azure", voiceId: "andrew" },
      name: name,
      firstMessage: firstMessage,
      voicemailDetection: { provider: "twilio" },
      analysisPlan: { structuredDataSchema: { type: structuredDataSchema } },
    })

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VAPI_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: body,
    }

    try {
      const response = await fetch("https://api.vapi.ai/assistant", options)
      const data = await response.json()

      if (!response.ok) {
        // Handle specific known errors
        if (data.error || data.statusCode || data.message) {
          return fail(response.status, { error: data })
        } else {
          // Handle unexpected error structure
          return fail(response.status, { error: "Unexpected error structure" })
        }
      }

      return {
        success: true,
        data,
      }
    } catch (err) {
      console.error("Fetch error:", err)
      return fail(500, { error: "Internal Server Error" })
    }
  },
}
