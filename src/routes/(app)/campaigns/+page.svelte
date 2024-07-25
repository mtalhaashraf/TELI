<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn, formatDate } from '$lib/utils.js';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import Actions from './components/data-table-actions.svelte';
	// import Switch from './components/data-table-switch-button.svelte';
	// import type { Campaign } from '../../../types/campaign.type';
	import { goto } from '$app/navigation';
	import type { Database } from '../../../types/supabase';

	export let data;
	let { campaigns, permissions } = data;
	$: ({ campaigns } = data);

	type Campaign = Database['public']['Tables']['campaigns']['Row'];

	let table = createTable(readable(campaigns as Campaign[]), {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const getColumns = () => {
		if (permissions.campaigns.actions) {
			return table.createColumns([
				table.column({
					header: 'Name',
					accessor: 'campaignname',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Assistant',
					accessor: 'assistant',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Desired Outcome',
					accessor: 'desiredoutcome',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Description',
					accessor: 'description',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Start Date',
					accessor: 'startdate',
					cell: ({ value }) => (value ? formatDate(value) : '-')
				}),
				table.column({
					header: 'End Date',
					accessor: 'enddate',
					cell: ({ value }) => (value ? formatDate(value) : '-'),
					plugins: {
						filter: {
							getFilterValue(value) {
								return value ? value.toLowerCase() : '';
							}
						}
					}
				}),
				table.column({
					header: 'Actions',
					accessor: (item: Campaign) => ({
						campaignid: item.campaignid,
						clientid: item.client_id
					}),
					cell: ({ value }) => {
						const { campaignid, clientid } = value as { campaignid: number; clientid: number };
						return createRender(Actions, { id: campaignid, clientid });
					},
					plugins: {
						sort: {
							disable: true
						}
					}
				})
			]);
		} else {
			return table.createColumns([
				table.column({
					header: 'Name',
					accessor: 'campaignname',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Assistant',
					accessor: 'assistant',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Desired Outcome',
					accessor: 'desiredoutcome',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Description',
					accessor: 'description',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Start Date',
					accessor: 'startdate',
					cell: ({ value }) => formatDate(value)
				}),
				table.column({
					header: 'End Date',
					accessor: 'enddate',
					cell: ({ value }) => formatDate(value || ''),
					plugins: {
						filter: {
							getFilterValue(value) {
								return value ? value.toLowerCase() : '';
							}
						}
					}
				})
			]);
		}
	};

	let columns = getColumns();

	let { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(columns);

	let { sortKeys } = pluginStates.sort;

	let { hiddenColumnIds } = pluginStates.hide;
	let ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	let { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	let { filterValue } = pluginStates.filter;
	const sortableCells = [
		'campaignname',
		'assistant',
		'desiredoutcome',
		'description',
		'startdate',
		'enddate'
	];
	let { selectedDataIds } = pluginStates.select;
	const sortableColumn = ['campaignname', 'assistant', 'desiredoutcome', 'description'];

	const handleAddCampaign = () => {
		goto('/campaigns/create');
	};
</script>

<svelte:head>
	<title>Campaigns</title>
</svelte:head>
<div class="w-full">
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Search..." type="text" bind:value={$filterValue} />
		{#if permissions.campaigns?.actions?.add}
			<Button on:click={handleAddCampaign} variant="outline" class="ml-auto">Add Campaign</Button>
		{/if}
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class={cn('[&:has([role=checkbox])]:pl-3')}>
										{#if cell.id === 'amount'}
											<div class="text-right font-medium">
												<Render of={cell.render()} />
											</div>
										{:else if sortableColumn.includes(cell.id)}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown
													class={cn(
														$sortKeys[0]?.id === cell.id && 'text-foreground',
														'ml-2 h-4 w-4'
													)}
												/>
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row
							{...rowAttrs}
							data-state={$selectedDataIds[row.id] && 'selected'}
							class="text-center"
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
										{#if cell.id === 'amount'}
											<div class="text-right font-medium">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'status'}
											<div class="capitalize">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} of {$rows.length} row(s) selected.
		</div>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
