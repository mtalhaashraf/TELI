<script lang="ts">
	import LoginForm from '$lib/components/auth/login-form.svelte';
	import type { PageData } from './$types.js';
	export let data: PageData;
</script>

<div class="flex h-screen w-screen items-center">
	<LoginForm data={data.form} />
</div>
