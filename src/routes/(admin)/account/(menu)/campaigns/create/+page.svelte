<script lang="ts">
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"
  import Form from "../../../../../../components/shared/form/form.svelte"
  import toast from "svelte-french-toast"
  import { goto } from "$app/navigation"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("campaigns")

  export let data

  let { assistants } = data
  let assistantList = assistants.map(
    (assistant: { id: string; name: string }) => {
      return { id: assistant.id, name: assistant.name }
    },
  )

  assistantList.unshift({
    name: "Select an assistant",
    disabled: true,
    selected: true,
  })

  let loading = false
</script>

<svelte:head>
  <title>Add New Campaigns</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Campaigns</h1>

<Form
  title="Add Details"
  {loading}
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
        toast.success("Created Successfully")
      } else {
        toast.error(result?.data?.error?.message[0])
        loading = false
      }
    }
  }}
  formTarget="?/createCampaign"
  buttonTitle="save"
  formFields={[
    {
      type: "input",
      name: "campaignname",
      label: "Campaign Name",
      inputType: "text",
      value: "",
    },
    {
      type: "input",
      name: "startdate",
      label: "Start Date",
      inputType: "date",
      value: "",
    },
    {
      type: "input",
      name: "enddate",
      label: "End Date",
      inputType: "date",
      value: "",
    },

    {
      type: "select",
      name: "assistant",
      label: "Assistant",
      value: "",
      options: assistantList,
    },
    {
      type: "textarea",
      name: "script",
      label: "Script",
      value: "",
    },
    {
      type: "input",
      name: "desiredoutcome",
      label: "Desired Outcome",
      inputType: "text",
      value: "",
    },
    {
      type: "textarea",
      name: "prompt",
      label: "Prompt",
      value: "",
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      value: "",
    },
  ]}
/>
