<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import toast from "svelte-french-toast"
  import Form from "../../../../../../components/shared/form/form.svelte"

  export let data

  let id = $page.params.id
  let { campaigns, assistants } = data
  let loading = false
  const editCampaign = campaigns?.find((campaign) => campaign.campaignid == id)

  let assistantList = assistants.map(
    (assistant: { id: string; name: string }) => {
      return {
        id: assistant.id,
        name: assistant.name,
        active: editCampaign?.assistID == assistant.id,
      }
    },
  )

  // Selecting the selected assistant
  const selectedAssistant = assistantList.find(
    (assistant: { id: string; name: string }) =>
      assistant.id === editCampaign?.assistID,
  )
</script>

<svelte:head>
  <title>Change Campaigns Details</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Campaigns</h1>

<Form
  {loading}
  title="Update Details"
  buttonTitle="Update"
  formTarget="?/updateCampaign"
  handleSubmit={({ formData }) => {
    loading = true
    const temp = assistantList.find((e) => e.id === formData.get("assistant"))

    formData.append("assistID", temp.id)
    formData.append("assistant", temp.name)
    return async ({ update, result }) => {
      update()
      await update({ reset: false })

      if (result.type === "success") {
        loading = false
        goto("/account/campaigns")
        toast.success("Updated Successfully")
      } else {
        toast.error(result?.data?.error?.message[0])
        loading = false
      }
    }
  }}
  formFields={[
    {
      type: "input",
      name: "campaignname",
      label: "Campaign Name",
      inputType: "text",
      value: editCampaign?.campaignname || "",
    },
    {
      type: "input",
      name: "campaignid",
      inputType: "number",
      hidden: true,
      value: editCampaign?.campaignid || "",
    },
    {
      type: "input",
      name: "clientid",
      inputType: "number",
      hidden: true,
      value: editCampaign?.clientid || "",
    },
    {
      type: "input",
      name: "assistID",
      inputType: "number",
      hidden: true,
      value: editCampaign?.assistID || "",
    },
    {
      type: "date",
      name: "startdate",
      label: "Start Date",
      inputType: "date",
      value: editCampaign?.startdate || "",
    },
    {
      type: "date",
      name: "enddate",
      label: "End Date",
      inputType: "date",
      value: editCampaign?.enddate || "",
    },
    {
      type: "select",
      name: "assistant",
      label: "Assistant",
      value: selectedAssistant?.id,
      options: assistantList,
    },
    {
      type: "textarea",
      name: "script",
      label: "Script",
      value: editCampaign?.script || "",
    },
    {
      type: "input",
      name: "desiredoutcome",
      label: "Desired Outcome",
      inputType: "text",
      value: editCampaign?.desiredoutcome || "",
    },
    {
      type: "textarea",
      name: "prompt",
      label: "Prompt",
      value: editCampaign?.prompt || "",
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      value: editCampaign?.description || "",
    },
  ]}
/>
