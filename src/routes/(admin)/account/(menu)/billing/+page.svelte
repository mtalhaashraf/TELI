<script lang="ts">
  import PricingModule from "../../../../(marketing)/pricing/pricing_module.svelte"
  import {
    defaultPlanId,
    pricingPlans,
  } from "../../../../(marketing)/pricing/pricing_plans"
  import SettingsModule from "../settings/settings_module.svelte"

  export let data

  let currentPlanId = data.currentPlanId ?? defaultPlanId
  let currentPlanName = pricingPlans.find(
    (x) => x.id === data.currentPlanId,
  )?.name
</script>

<svelte:head>
  <title>Billing</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">
  {data.isActiveCustomer ? "Billing" : "Select a Plan"}
</h1>

{#if !data.isActiveCustomer}
  <div class="mt-12">
    <PricingModule {currentPlanId} callToAction="Select Plan" center={false} />
  </div>

  {#if data.hasEverHadSubscription}
    <div class="mt-10">
      <a href="/account/billing/manage" class="link">View past invoices</a>
    </div>
  {/if}
{:else}
  <SettingsModule
    title="Subscription"
    editable={false}
    fields={[
      {
        id: "plan",
        label: "Current Plan",
        initialValue: currentPlanName || "",
      },
    ]}
    editButtonTitle="Manage Subscripton"
    editLink="/account/billing/manage"
  />
{/if}
