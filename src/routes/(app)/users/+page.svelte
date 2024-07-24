<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils.js';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Column, Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import type { User } from '../../../types/user.type';
	import Actions from './components/data-table-actions.svelte';

	export let data;

	const { users, permissions } = data;

	const getColumns = () => {
		if (permissions.users?.actions) {
			return table.createColumns([
				table.column({
					header: 'Name',
					accessor: 'full_name',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Client',
					accessor: 'client',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Company Email',
					accessor: 'company_email',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Phone',
					accessor: 'phone',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Cell',
					accessor: 'cell',
					cell: ({ value }) => value || '-'
				}),
				// table.column({
				// 	header: 'Secondary Email',
				// 	accessor: 'email2',
				// 	cell: ({ value }) => value || '-'
				// }),
				table.column({
					header: 'Rights',
					accessor: 'rights',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Status',
					accessor: 'status',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: '',
					accessor: ({ id }) => id,
					cell: (item) => {
						return createRender(Actions, { id: item.value });
					}
				})
			]);
		} else {
			return table.createColumns([
				table.column({
					header: 'Name',
					accessor: 'full_name',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Client',
					accessor: 'client',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Company Email',
					accessor: 'company_email',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Phone',
					accessor: 'phone',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Cell',
					accessor: 'cell',
					cell: ({ value }) => value || '-'
				}),
				// table.column({
				// 	header: 'Secondary Email',
				// 	accessor: 'email2',
				// 	cell: ({ value }) => value || '-'
				// }),
				table.column({
					header: 'Rights',
					accessor: 'rights',
					cell: ({ value }) => value || '-'
				}),
				table.column({
					header: 'Status',
					accessor: 'status',
					cell: ({ value }) => value || '-'
				})
			]);
		}
	};

	const table = createTable(readable(users as User[]), {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const capitalizeColumns = ['status', 'rights'];

	const hideableCols = ['status', 'email', 'amount'];

	const sortableColumn = [
		'rights',
		'status',
		'email2',
		'cell',
		'phone',
		'company_email',
		'full_name',
		'client'
	];

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(getColumns());

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds } = pluginStates.select;

	const handleAddUser = () => {
		console.log('Going to add');
		goto('/users/create');
	};
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<div class="w-full">
	<div class="flex items-center justify-between py-4">
		<Input class="max-w-sm" placeholder="Search..." type="text" bind:value={$filterValue} />
		<div>
			{#if data.permissions.users?.actions?.add}
				<Button on:click={handleAddUser} variant="outline" class="ml-auto">Add User</Button>
			{/if}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" class="ml-auto" builders={[builder]}>
						Columns <ChevronDown class="ml-2 h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each flatColumns as col}
						{#if hideableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
								{col.header}
							</DropdownMenu.CheckboxItem>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
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
										{:else if capitalizeColumns.includes(cell.id)}
											<div class="capitalize">
												<Render of={cell.render()} />
											</div>
										{:else if ['email2', 'company_email'].includes(cell.id)}
											<a
												class="capitalize hover:text-blue-500"
												href="mailto:{cell.render()}"
												target="_blank"
											>
												<Render of={cell.render()} />
											</a>
										{:else}
											<div>
												<Render of={cell.render()} />
											</div>
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
