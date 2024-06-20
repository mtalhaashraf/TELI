<script lang="ts">
  import { enhance } from "$app/forms"
  import type { SubmitFunction } from "@sveltejs/kit"

  export let title
  export let formTarget
  export let formFields: any[] = []
  export let buttonTitle = "Submit"
  export let handleSubmit: SubmitFunction = () => {}
  export let loading: boolean

  // Helper function to format date if needed
  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }
</script>

<div class="card p-6 pb-7 mt-8 w-full flex flex-col md:flex-row shadow">
  <div class="text-xl font-bold mb-3 w-48 flex-none">{title}</div>
  <div class="w-full min-w-48">
    <form
      class="form-widget w-full flex flex-col"
      method="POST"
      action={formTarget}
      use:enhance={handleSubmit}
    >
      {#each formFields as field}
        <div>
          {#if field.label}
            <span class="text-sm text-gray-500">{field.label}</span>
          {/if}
          <div>
            {#if field.type === "input"}
              <input
                class="input-sm input input-bordered w-1/2 mb-3 text-base py-4"
                type={field.inputType}
                name={field.name}
                value={field.value}
                hidden={field.hidden || false}
              />
            {:else if field.type === "date"}
              <input
                class="input-sm input input-bordered w-1/2 mb-3 text-base py-4"
                type={field.inputType}
                name={field.name}
                value={formatDate(field.value)}
                on:change={(e) => console.log(e)}
              />
            {:else if field.type === "select"}
              <select
                class="select select-bordered w-1/2 mb-3 text-base py-2"
                name={field.name}
                bind:value={field.value}
                placeholder="Select an option"
              >
                {#each field.options as option}
                  <option value={option.id} disabled={option.disabled}>
                    {option.name}
                  </option>
                {/each}
              </select>
            {:else if field.type === "selected"}
              <select
                class="select select-bordered w-1/2 mb-3 text-base py-2"
                name={field.name}
                value={field.value}
              >
                {#each field.options as option}
                  <option value={option.name} disabled={option.disabled}>
                    {option.name}
                  </option>
                {/each}
              </select>
            {:else if field.type === "textarea"}
              <textarea
                class="textarea textarea-bordered w-1/2 mb-3 text-base py-4"
                name={field.name}
                bind:value={field.value}
                rows={field.rows || 3}
              ></textarea>
            {/if}
          </div>
        </div>
      {/each}
      <button
        type="submit"
        class="ml-auto btn btn-sm mt-3 min-w-[145px] btn-success"
      >
        {#if loading}
          <span class="loading loading-spinner loading-md align-middle mx-3"
          ></span>
        {:else}
          {buttonTitle}
        {/if}
      </button>
    </form>
  </div>
</div>
