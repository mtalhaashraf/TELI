<script lang="ts">
  import { goto } from "$app/navigation"
  import toast from "svelte-french-toast"
  import Table from "../../../../../components/shared/table/table.svelte"

  export let data: {
    assistants: {
      id: string
      name: string
      createdAt: string
      updatedAt: string
      firstMessage: string
      voicemailMessage: string
    }[]
  }

  let { assistants } = data

  // map the assistant data
  let table = assistants?.map((item) => ({
    id: item.id,
    name: item.name,
    first_Message: item.firstMessage,
    system_Role: item?.model?.messages[0]?.role || "",
    system_Prompt: item?.model?.messages[0]?.content || "",
  }))

  async function deleteAssistants(id: number) {
    try {
      const response = await fetch("/api/assistants/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Deleted Successfully")

        // Update the table
        table = table?.filter((item) => item.id !== id)
      } else {
        toast.success(result)
        // Show an error message to the user
      }
    } catch (error) {
      toast.success(error?.message)
    }
  }

  function handleActions(item: any) {
    const assistant = item.detail.text
    if (assistant.type === "edit") {
      goto("/account/assistants/" + assistant.value.id)
    }
    if (assistant.type === "delete") {
      const id = item.detail.text.value.id
      console.log("🚀 ~ handleActions ~ id:", id)
      deleteAssistants(id)
    }
  }
</script>

<svelte:head>
  <title>Assistants</title>
</svelte:head>

<div class="flex justify-between items-center pb-5">
  <h1 class="text-2xl font-bold mb-6">Assistants Details</h1>
  <button
    class="btn btn-primary"
    on:click={() => goto("/account/assistants/create")}>Add New</button
  >
</div>

<Table
  {table}
  editableFields={["name"]}
  hiddenKeys={["id"]}
  actions={[
    { type: "edit", label: "Edit" },
    { type: "delete", label: "Delete" },
  ]}
  on:edit={handleActions}
/>
