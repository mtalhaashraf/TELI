<script lang="ts">
  import { invalidate } from "$app/navigation"
  import { page } from "$app/stores"
  import {
    BarChart3,
    Bot,
    CreditCard,
    Flag,
    Settings,
    Users,
  } from "lucide-svelte"
  import { last } from "ramda"
  import { onMount } from "svelte"
  import "../../../app.css"
  import Theme from "./theme.svelte"

  export let data

  function closeDrawer(): void {
    const adminDrawer = document.getElementById(
      "admin-drawer",
    ) as HTMLInputElement
    adminDrawer.checked = false
  }

  let { supabase, session } = data
  $: ({ supabase, session } = data)

  $: route = last($page.url.pathname.split("/"))

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth")
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<div class="drawer lg:drawer-open">
  <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <div class="navbar bg-base-100 lg:hidden">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/">Teli AI Dialerr</a
        >
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <label for="admin-drawer" class="btn btn-ghost btn-circle">
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              /></svg
            > -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              /></svg
            >
          </label>
        </div>
      </div>
    </div>
    <div class="container px-6 lg:px-12 py-3 lg:py-6">
      <slot />
    </div>
  </div>

  <div class="drawer-side">
    <label for="admin-drawer" class="drawer-overlay" />
    <ul
      class="menu menu-med p-4 w-50 min-h-full bg-base-100 lg:border-r text-primary"
    >
      <li>
        <div
          class="normal-case menu-title text-xl font-bold text-primary flex flex-row"
        >
          <a href="/" class="grow">Teli AI </a>
          <label for="admin-drawer" class="lg:hidden ml-3"> &#x2715; </label>
        </div>
      </li>
      <li>
        <a
          href="/account"
          class={route === "home" ? "active" : ""}
          on:click={closeDrawer}
        >
          <BarChart3 class="w-5 h-5" />
          Statistics
        </a>
      </li>
      <li>
        <a
          href="/account/campaigns"
          class={route === "campaigns" ? "active" : ""}
          on:click={closeDrawer}
        >
          <Flag class="w-5 h-5" />
          Campaigns
        </a>
      </li>
      <li>
        <a
          href="/account/users"
          class={route === "users" ? "active" : ""}
          on:click={closeDrawer}
        >
          <Users class="w-5 h-5" />
          Users
        </a>
      </li>
      <li>
        <a
          href="/account/assistants"
          class={route === "assistants" ? "active" : ""}
          on:click={closeDrawer}
        >
          <Bot class="w-5 h-5" />
          Assistant
        </a>
      </li>
      <li>
        <a
          href="/account/billing"
          class={route === "billing" ? "active" : ""}
          on:click={closeDrawer}
        >
          <CreditCard class="w-5 h-5" />
          Billing
        </a>
      </li>
      <li>
        <a
          href="/account/settings"
          class={route === "settings" ? "active" : ""}
          on:click={closeDrawer}
        >
          <Settings class="w-5 h-5" />
          Settings
        </a>
      </li>
      <li class="mt-auto">
        <Theme />
      </li>
      <li>
        <a href="/account/sign_out" class="text-base">Sign Out</a>
      </li>
    </ul>
  </div>
</div>
