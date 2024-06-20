<script lang="ts">
  import Form from "../../../../../../components/shared/form/form.svelte"
  import { goto } from "$app/navigation"
  import toast from "svelte-french-toast"

  let loading = false

  const models = [
    { name: "gpt-4o" },
    { name: "gpt-4o-2024-05-13" },
    { name: "gpt-4-turbo" },
    { name: "gpt-4-turbo-2024-04-09" },
    { name: "gpt-4-turbo-preview" },
    { name: "gpt-4-0125-preview" },
    { name: "gpt-4-1106-preview" },
    { name: "gpt-4" },
    { name: "gpt-4-0613" },
    { name: "gpt-3.5-turbo" },
    { name: "gpt-3.5-turbo-0125" },
    { name: "gpt-3.5-turbo-1106" },
    { name: "gpt-3.5-turbo-16k" },
    { name: "gpt-3.5-turbo-0613" },
  ]

  const structuredDataSchemas = [
    { name: "string" },
    { name: "number" },
    { name: "integer" },
    { name: "boolean" },
    { name: "array" },
    { name: "object" },
  ]

  const systemRoles = [
    { name: "assistant" },
    { name: "function" },
    { name: "user" },
    { name: "system" },
    { name: "tool" },
  ]
</script>

<svelte:head>
  <title>Add Assistants Details</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Assistant</h1>

<Form
  title="Add Details"
  formTarget="?/add"
  buttonTitle="Save"
  {loading}
  handleSubmit={({ formData }) => {
    loading = true
    formData.append("transcriptionProvider", "deepgram")
    return async ({ update, result }) => {
      update()
      await update({ reset: false })

      if (result.type === "success") {
        loading = false
        goto("/account/assistants")
        toast.success("Created Successfully")
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
      value: "",
    },
    {
      type: "textarea",
      name: "firstMessage",
      label: "First Message",
      inputType: "text",
      value: "",
      rows: 3,
    },
    {
      type: "selected",
      name: "openaimodel",
      label: "Open Ai Model",
      value: "",
      options: models,
    },
    {
      type: "selected",
      name: "structuredDataSchema",
      label: "Structured Data Schema",
      value: "string",
      options: structuredDataSchemas,
    },
    {
      type: "selected",
      name: "systemRole",
      label: "System Role",
      value: "system",
      options: systemRoles,
    },
    {
      type: "textarea",
      name: "systemPrompt",
      label: "System prompt",
      inputType: "text",
      value: "",
      rows: 12,
    },
  ]}
/>
