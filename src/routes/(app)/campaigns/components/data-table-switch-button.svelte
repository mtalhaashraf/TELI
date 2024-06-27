<script lang="ts">
	import { Play, Pause } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	let isPlaying = false;

	function togglePlayPause() {
		isPlaying = !isPlaying;
	}
</script>

<div class="grid w-10 cursor-pointer rounded-full overflow-hidden">
    {#if isPlaying}
        <Button class="p-2" on:click={togglePlayPause}>
            <Pause size="18" />
        </Button>
    {:else}
        <Button class="p-2" on:click={togglePlayPause}>
            <Play size="18" />
        </Button>
    {/if}
</div>

