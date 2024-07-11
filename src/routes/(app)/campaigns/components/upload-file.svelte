<script>
	export let show = false;
	export let onClose = () => {};

	export let campaignId = '';
	export let clientId = '';

	function close() {
		show = false;
		onClose();
	}
</script>

{#if show}
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-1/3 rounded-lg bg-white shadow-lg">
			<div class="flex items-center justify-between border-b p-4">
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
						<label class="mb-2 block text-sm font-bold text-gray-700" for="file"
							>Select .CSV file ONLY</label
						>
						<input
							type="file"
							name="file"
							accept=".CSV"
							class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						/>
					</div>
					<div class="flex items-center justify-between">
						<button
							class="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
							type="button"
							on:click={close}>Cancel</button
						>
						<button
							class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
							type="submit">Upload</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
