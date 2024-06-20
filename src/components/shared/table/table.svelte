<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { enhance } from "$app/forms"

  export let table: any[] = []
  export let editableFields: string[] = []
  export let actions: any[] = []
  export let hiddenKeys: string[] | undefined = undefined

  const dispatch = createEventDispatcher()

  // Handler for the edit action
  function handleActions(item: any) {
    dispatch("edit", {
      text: item,
    })
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${month}-${day}-${year}`
  }

  let editingItem: any = null
  let editingField: string | null = null
  let loading: boolean = false

  // Ensure each item has a unique key
  function getUniqueKey(item: any, index: number) {
    return item.id !== undefined ? item.id : index
  }

  function isValidDate(dateString: string) {
    // Try to parse the date using the Date constructor
    const date = new Date(dateString)

    // Check if the resulting date is valid
    if (isNaN(date.getTime())) {
      return false
    }

    // Further validation for ISO 8601 format (e.g., "2024-06-10T00:00:00+00:00")
    const iso8601Regex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:\d{2}|Z)$/
    return iso8601Regex.test(dateString)
  }
</script>

{#if table.length > 0}
  <div class="relative overflow-x-auto shadow-lg sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead class="text-xs text-base-content uppercase">
        <tr>
          {#each Object.keys(table[0]).filter((k) => !hiddenKeys?.includes(k)) as column}
            <th scope="col" class="px-6 py-3 capitalize"
              >{column.replaceAll("_", " ")}</th
            >
          {/each}
          <th scope="col" class="px-6 py-3 capitalize">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each table as item, index (getUniqueKey(item, index))}
          <tr class="border-b">
            {#each Object.entries(item).filter(([k, v]) => !hiddenKeys?.includes(k)) as [key, value]}
              <td
                class="px-6 py-4 whitespace-nowrap text-base-content truncate max-w-[200px]"
                on:click={() => {
                  if (editableFields) {
                    if (editableFields.includes(key)) {
                      editingItem = item
                      editingField = key
                    }
                  }
                }}
              >
                {#if editingItem === item && editingField === key}
                  <div class="relative flex">
                    <form
                      class="form-widget flex flex-col"
                      method="POST"
                      action="?/update"
                      use:enhance={({ formData }) => {
                        formData.append("id", item.id)
                        formData.append("key", key)
                        loading = true
                        return async ({ update, result }) => {
                          update()
                          await update({ reset: false })
                          if (result.type === "success") {
                            editingItem = null
                            editingField = null
                            loading = false
                          }
                        }
                      }}
                    >
                      <input
                        type="text"
                        name="name"
                        class="input input-bordered w-full text-base"
                        bind:value={editingItem[key]}
                      />
                      <button class="absolute left-0 top-[44px] text-primary">
                        {#if loading}
                          <span
                            class="loading loading-spinner loading-md align-middle mx-3"
                          ></span>
                        {:else}
                          Save
                        {/if}
                      </button>
                    </form>
                  </div>
                {:else if value === null || value === ""}
                  Empty
                {:else if typeof value == "string" && isValidDate(value || "")}
                  {formatDate(value)}
                {:else}
                  {value}
                {/if}
              </td>
            {/each}
            <td class="px-6 py-4 flex gap-2">
              {#each actions as action}
                <button
                  class="btn btn-sm px-4 py-2 border text-primary hover:text-white hover:btn-primary"
                  on:click|preventDefault={() =>
                    handleActions({ value: item, type: action.type })}
                >
                  {#if loading}
                    <span
                      class="loading loading-spinner loading-md align-middle mx-3"
                    ></span>
                  {:else}
                    {action.label}
                  {/if}
                </button>
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <div class="w-full flex justify-center items-center">
    <img class="h-80" src="/images/nodata.png" alt="NO_DATA" />
  </div>
{/if}
