<script>
  export let show = false
  export let onClose = () => {}

  export let campaignId = ""
  export let clientId = ""

  function close() {
    show = false
    onClose()
  }
</script>

{#if show}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg shadow-lg w-1/3">
      <div class="p-4 border-b flex justify-between items-center">
        <h2 class="text-xl font-semibold">Upload Lead File</h2>
        <button class="text-black" on:click={close}>&times;</button>
      </div>
      <div class="p-4">
        <form
          action="https://telibotdockerwebapp.azurewebsites.net/vapi/uploadfile/"
          method="post"
          enctype="multipart/form-data"
        >
          <input type="hidden" name="ClientID" bind:value={clientId} />
          <input type="hidden" name="CampaignID" bind:value={campaignId} />
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="file"
              >Select .CSV file ONLY</label
            >
            <input
              type="file"
              name="file"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              on:click={close}>Cancel</button
            >
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">Upload</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
