<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://js.stripe.com/v3/pricing-table.js';
		script.async = true;
		document.body.appendChild(script);
	});
</script>

<div>
	<stripe-pricing-table
		pricing-table-id="prctbl_1PWL1MGqFlhwDWz3eNOa3Til"
		publishable-key="pk_live_51IyRJkGqFlhwDWz3ZUhSpkHeVXLR4RuAVcapAiSvM81ivz1UoEjqhV1PXQ9SH57kl3AZl3tvgoZVLIDSnhlgJthM00lW5aBMo7"
	>
	</stripe-pricing-table>
</div>

<style>
	stripe-pricing-table {
		max-width: 100%;
	}
</style>
