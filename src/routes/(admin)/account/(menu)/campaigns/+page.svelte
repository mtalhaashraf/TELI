<script lang="ts">
  import { goto } from "$app/navigation"
  import toast from "svelte-french-toast"
  import Table from "../../../../../components/shared/table/table.svelte"
  import Modal from "./ModalForm.svelte"

  export let data
  let { campaigns, profile } = data

  let showModal = false
  let clientId = ""
  let campaignId = ""

  function toggleModal() {
    showModal = !showModal
  }

  // map the campaigns data
  let table = campaigns?.map((item) => ({
    id: item.campaignid,
    name: item.campaignname,
    assistant: item.assistant,
    // script: item.script,
    desired_outcome: item.desiredoutcome,
    // prompt: item.prompt,
    // assistID: item.assistID,
    description: item.description,
    start_date: item.startdate,
    end_date: item.enddate,
    // createdate: item.createdate,
  }))

  async function deleteCampaign(campaignid: number) {
    try {
      const response = await fetch("/api/campaigns/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignid }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Deleted Successfully")
        // Update the table
        table = table?.filter((item) => item.campaignid !== campaignid)
      } else {
        toast.success(result)
        // Show an error message to the user
      }
    } catch (error) {
      toast.success(error?.message)
    }
  }

  function handleActions(item: any) {
    const campaign = item.detail.text
    if (campaign.type === "edit") {
      goto("/account/campaigns/" + campaign.value.id)
    } else if (campaign.type === "delete") {
      const id = campaign.value.id
      deleteCampaign(id)
    } else if (campaign.type === "upload") {
      console.log("Upload")
      campaignId = campaign.value.id
      clientId = profile?.id || ""
      toggleModal()
    }
  }
</script>

<svelte:head>
  <title>Campaigns</title>
</svelte:head>

<div class="flex justify-between items-center pb-5">
  <h1 class="text-2xl font-bold mb-6">Campaigns Details</h1>
  <button
    class="btn btn-primary"
    on:click={() => goto("/account/campaigns/create")}>Add New</button
  >
</div>

<Table
  {table}
  on:edit={handleActions}
  actions={[
    { type: "edit", label: "Edit" },
    { type: "delete", label: "Delete" },
    { type: "upload", label: "Upload File" },
  ]}
/>

<Modal
  bind:campaignId
  bind:clientId
  bind:show={showModal}
  onClose={() => (showModal = false)}
/>
