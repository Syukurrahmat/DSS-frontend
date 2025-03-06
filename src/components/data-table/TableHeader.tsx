import { chakra, HStack, Text, Th, Thead, Tr } from '@chakra-ui/react'; //prettier-ignore
import { IconArrowsSort, IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react'; //prettier-ignore
import { flexRender, Header, Table as TanStackTable } from '@tanstack/react-table'; //prettier-ignore

export function TableHeader({ table }: { table: TanStackTable<any> }) {
	return (
		<Thead>
			{table.getHeaderGroups().map((headerGroup) => (
				<Tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						const meta: any = header.column.columnDef.meta;

						return (
							<Th
								key={header.id}
								py="3.5"
								onClick={meta?.sortable && header.column.getToggleSortingHandler()}
								isNumeric={meta?.isNumeric}
								className={meta?.sortable && 'sortable-th'}
							>
								<HStack justify="space-between">
									<Text noOfLines={1}>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</Text>
									{meta?.sortable && <SortingIcon header={header} />}
								</HStack>
							</Th>
						);
					})}
				</Tr>
			))}
		</Thead>
	);
}

function SortingIcon({ header }: { header: Header<any, unknown> }) {
	return (
		<chakra.span boxSize="1.2em">
			{header.column.getIsSorted() ? (
				header.column.getIsSorted() === 'desc' ? (
					<IconSortDescending2 size="18" aria-label="sorted descending" />
				) : (
					<IconSortAscending2 size="18" aria-label="sorted ascending" />
				)
			) : (
				<IconArrowsSort size="18" style={{ opacity: 0.5 }} aria-label="sorting" />
			)}
		</chakra.span>
	);
}
