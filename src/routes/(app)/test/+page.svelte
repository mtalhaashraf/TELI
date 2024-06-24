<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';

	type Payment = {
		id: string;
		amount: number;
		status: 'pending' | 'processing' | 'success' | 'failed';
		email: string;
	};

	const data: Payment[] = [
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: 'sdfsdf',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: 'sdfwq4',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: '34qt554',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		}
		//...
	];

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'status',
			header: 'Status',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'amount',
			header: 'Amount',
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD'
				}).format(value);
				return formatted;
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>

<div class="h-[500px] w-full">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<Table.Head {...attrs}>
									{#if cell.id === 'amount'}
										<div class="text-right">
											<Render of={cell.render()} />
										</div>
									{:else if cell.id === 'email'}
										<Button variant="ghost" on:click={props.sort.toggle}>
											<Render of={cell.render()} />
											<ArrowUpDown class={'ml-2 h-4 w-4'} />
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
			<!-- ... -->
		</Table.Body>
	</Table.Root>
</div>
