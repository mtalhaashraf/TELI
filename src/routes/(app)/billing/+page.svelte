<script>
	import PricingTable from '$lib/components/billing/stripe-price-table.svelte';
</script>

<svelte:head>
	<title>Billing</title>
</svelte:head>

<main>
	<h1 class="my-12 grid w-full grid-cols-1 content-center justify-items-center text-3xl font-bold">
		The Plans We Offer for Your Business
	</h1>
	<PricingTable />
</main>
 