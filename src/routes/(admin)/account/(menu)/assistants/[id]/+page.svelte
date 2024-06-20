<script lang="ts">
  import Form from "../../../../../../components/shared/form/form.svelte"
  import { page } from "$app/stores"
  import { goto } from "$app/navigation"
  import toast from "svelte-french-toast"

  let id = $page.params.id
  let loading = false

  export let data

  let { assistants } = data
  $: assistants = assistants.find((assistant: any) => assistant.id == id)
</script>

<svelte:head>
  <title>Change Assistants Details</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Assistants</h1>

<Form
  title="Update Details"
  formTarget="?/update"
  buttonTitle="Update"
  {loading}
  handleSubmit={({ formData }) => {
    loading = true

    formData.append("id", assistants.id)

    return async ({ update, result }) => {
      update()
      await update({ reset: false })

      if (result.type === "success") {
        loading = false
        goto("/account/assistants")
        toast.success("Updated Successfully")
        console.log("🚀 ~ return ~ result:", result)
      } else {
        toast.error(result?.data?.error?.message[0])
        loading = false
      }
    }
  }}
  formFields={[
    {
      type: "input",
      name: "name",
      label: "Name",
      inputType: "text",
      value: assistants?.name || "",
    },
    {
      type: "textarea",
      name: "firstMessage",
      label: "First Message",
      inputType: "text",
      value: assistants?.firstMessage || "",
      rows: 3,
    },
    {
      type: "input",
      name: "systemRole",
      label: "System Role",
      inputType: "text",
      value: assistants?.model?.messages[0].role || "",
    },
    {
      type: "textarea",
      name: "systemPrompt",
      label: "System prompt",
      inputType: "text",
      value: assistants?.model?.messages[0].content || "",
      rows: 12,
    },
  ]}
/>

<!-- 
{
  type: "input",
  name: "name",
  label: "Campaign Name",
  inputType: "text",
  value: "",
},
{
  type: "input",
  name: "firstMessage",
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
  type: "input",
  name: "script",
  label: "Script",
  inputType: "text",
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
  type: "input",
  name: "prompt",
  label: "Prompt",
  inputType: "text",
  value: "",
},
{
  type: "textarea",
  name: "description",
  label: "Description",
  value: "",
}, -->
