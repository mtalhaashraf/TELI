<!-- <meta http-equiv="Refresh" content="0; url='/statistics'" /> -->
<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      console.log("Checking for redirection");
      if (window.location.pathname === '/') {
        console.log("Redirecting to /statistics");
        window.location.href = '/statistics';
      }
    });
</script>
