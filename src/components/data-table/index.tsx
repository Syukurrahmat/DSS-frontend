import { UrlWithQuery } from '@/lib/fetcher.utils';
import { Box, Skeleton, Table, TableContainer, Tbody, Td, Text, Tr, VStack } from '@chakra-ui/react'; //prettier-ignore
import { ColumnDef, flexRender, getCoreRowModel, RowSelectionState, TableOptions, useReactTable } from '@tanstack/react-table'; //prettier-ignore
import React, { ReactNode, useEffect, useRef } from 'react';
import useSWR from 'swr';
import usePagination from './hook/usePagination';
import useSorting from './hook/useSorting';
import { Pagination } from './Pagination';
import './style.css';
import { TableHeader } from './TableHeader';

interface IDataTable<T = any> extends Omit<TableOptions<T>, 'data' | 'getCoreRowModel'> {
	apiUrl: string;
	columns: ColumnDef<T, any>[];
	emptyMessage?: string[];
	extractData?: React.Dispatch<T[] | undefined>;
	searchQuery?: string;
	withHeader?: boolean;
	hiddenPagination?: boolean;
	initialSkeletonRowCount?: number;
	rowSelection?: RowSelectionState;
	separatingData?: {
		separator?: (value: T[]) => (T & { separator?: true })[];
		component: ({ value }: { value: T }) => ReactNode;
	};
}

export default function DataTable<T = any>(props: IDataTable<T>) {
	const {
		apiUrl,
		emptyMessage,
		extractData,
		rowSelection,
		searchQuery,
		withHeader = true,
		hiddenPagination = false,
		initialSkeletonRowCount = 10,
		separatingData,
		...rest
	} = props;

	const { pagination, pageIndex, limit, onPaginationChange } = usePagination();
	const { sorting, field, order, onSortingChange } = useSorting();

	const itemcount = useRef({
		totalItems: 0,
		itemsInPage: 0,
	});

	const { data: rawData, isLoading } = useSWR<Paginated<T>>(
		UrlWithQuery(apiUrl, {
			page: pageIndex + 1,
			limit: limit,
			sort: field,
			order: order,
			search: searchQuery ? searchQuery : undefined,
		}),
	);

	const data = separatingData?.separator
		? separatingData?.separator(rawData?.rows || [])
		: rawData?.rows || [];

	useEffect(() => {
		if (extractData) extractData(data);
	}, [data]);

	if (rawData) {
		itemcount.current = {
			totalItems: rawData.meta.total,
			itemsInPage: rawData.rows.length,
		};
	}

	const table = useReactTable<T>({
		data,
		onPaginationChange,
		onSortingChange,
		manualPagination: true,
		manualSorting: true,
		state: { pagination, sorting, rowSelection },
		rowCount: itemcount.current.totalItems,
		enableMultiRowSelection: false,
		getCoreRowModel: getCoreRowModel(),
		...rest,
	});

	return (
		<Box {...rest} maxH="inherit" h="fit-content" w="full">
			<Box shadow="xs" bg="white" rounded="md" overflow="hidden">
				{Boolean(searchQuery) && Boolean(rawData?.meta.total) && (
					<Text
						px="3"
						py="2"
						fontSize="md"
						fontWeight="600"
						borderBottom="1px solid"
						borderColor="gray.100"
					>
						Menampilkan {rawData?.meta.total} Item dari kata kunci "{searchQuery}"
					</Text>
				)}

				<TableContainer className="fixTableHead" w="full" h="fit-content">
					<Table variant={!withHeader ? 'striped' : undefined}>
						{withHeader && <TableHeader table={table} />}
						<Tbody>
							{!isLoading && !data.length && (
								<Tr>
									<Td colSpan={9999}>
										<VStack py="2" color="gray.500">
											<Text fontSize="2xl" fontWeight="500">
												{emptyMessage ? emptyMessage[0] : 'Tidak ada data'}
											</Text>
											<Text>{emptyMessage ? emptyMessage[1] : ''}</Text>
										</VStack>
									</Td>
								</Tr>
							)}

							{isLoading && (
								<RowSkeleton
									rowCount={itemcount.current.itemsInPage}
									initialCount={initialSkeletonRowCount}
								/>
							)}

							{table.getRowModel().rows.map((row) => (
								<Tr key={row.id}>
									{/* @ts-ignore */}
									{separatingData && row.original.separator ? (
										<Td  colSpan={9999}>
											<separatingData.component value={row.original} />
										</Td>
									) : (
										row.getVisibleCells().map((cell) => {
											const meta: any = cell.column.columnDef.meta;
											return (
												<Td key={cell.id} isNumeric={meta?.isNumeric}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</Td>
											);
										})
									)}
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>

			{!hiddenPagination && (
				<Pagination px="2" mt="3" table={table} sizes={[10, 25, 50, 75, 100]} />
			)}
		</Box>
	);
}

function RowSkeleton({ rowCount, initialCount }: { rowCount?: number; initialCount: number }) {
	return Array.from({ length: rowCount || initialCount }, (_, i) => (
		<Tr key={i}>
			<Td colSpan={9999}>
				<Skeleton rounded="md" h="28px" />
			</Td>
		</Tr>
	));
}
