<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import AreaChart from 'lucide-svelte/icons/area-chart';
	import BotMessageSquare from 'lucide-svelte/icons/bot-message-square';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import Settings from 'lucide-svelte/icons/settings';
	import ShieldAlert from 'lucide-svelte/icons/shield-alert';
	import UserRoundPen from 'lucide-svelte/icons/user-round-plus';
	import Users from 'lucide-svelte/icons/users';
	import { onDestroy, onMount } from 'svelte';

	export let data;

	let { supabase, session, permissions } = data;
	$: ({ supabase, session, permissions } = data);

	onMount(() => {
		const observer = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				('supabase:auth');
			}
		});

		return () => observer.data.subscription.unsubscribe();
	});

	const handleLogout = async () => {
		await supabase.auth.signOut();
		goto('/auth');
	};

	const menuItems = [
		{
			name: 'Statistics',
			path: '/statistics',
			icon: AreaChart
		},
		{
			name: 'Clients',
			path: '/clients',
			icon: Users
		},
		{
			name: 'Assistants',
			path: '/assistants',
			icon: BotMessageSquare
		},
		{
			name: 'Users',
			path: '/users',
			icon: Users
		},
		{
			name: 'Campaigns',
			path: '/campaigns',
			icon: ShieldAlert
		},
		{
			name: 'Billing',
			path: '/billing',
			icon: CreditCard
		},
		{
			name: 'Profile',
			path: '/profile',
			icon: UserRoundPen
		},
		{
			name: 'Settings',
			path: '/settings',
			icon: Settings
		}
	];

	// console.log(permissions);

	const filteredMenuItems = menuItems.filter((item) => {
		return permissions[item.name.toLowerCase()];
	});
</script>

<div class="box-border h-screen w-screen">
	<div class="flex h-[75px] items-center justify-between border-b px-6 py-2">
		<span class="mb-4 text-3xl font-extrabold text-slate-900">Teli</span>
		<p>{data.session.user.email}</p>
		<Button on:click={handleLogout}>Logout</Button>
	</div>
	<div class="flex h-[calc(100vh-75px)]">
		<div class=" border-r p-2">
			<div class="flex flex-col gap-1">
				{#each filteredMenuItems as { name, path, icon } (name)}
					<a
						class="flex items-center gap-2 rounded-sm p-2 hover:bg-slate-900 hover:text-white {$page
							.url.pathname == path && 'bg-slate-900 text-white'}"
						href={path}
					>
						<svelte:component this={icon} />
						<span class="hidden md:block">
							{name}
						</span>
					</a>
				{/each}
			</div>
		</div>
		<div class="w-full overflow-y-auto p-4">
			<h1 class="text-3xl font-bold capitalize">
				{menuItems.map((e) => e.path).includes($page.url.pathname)
					? $page.url.pathname.replace('/', '')
					: ''}
			</h1>
			<slot />
		</div>
	</div>
</div>
