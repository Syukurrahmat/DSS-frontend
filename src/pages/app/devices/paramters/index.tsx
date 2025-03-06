import DataTable from '@/components/data-table';
import TagWithIcon from '@/components/display/TagWithIcon';
import { DTParameter } from '@/types/data-table';
import { Stack, Text } from '@chakra-ui/react';
import { IconAlertTriangle, IconCheck, IconWind } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import { DTHeader } from '../../users/DTHeader';

export default function ParametersSection() {
	return (
		<Stack gap="4" flex="1">
			<Stack spacing="1">
				<DTHeader
					title="Parameter"
					iconTitle={IconWind}
					addButtonLabel="Tambah Parameter"
					onAddButtonPress={() => {}}
				/>
				<Text color="dimmed">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur libero
					alias odio saepe neque necessitatibus.
				</Text>
			</Stack>
			<DataTable apiUrl="/parameters" columns={columns} />
		</Stack>
	);
}

const columnHelper = createColumnHelper<DTParameter>();

const columns = [
	columnHelper.accessor('name', {
		header: 'Nama',
		cell: (info) => <Text children={info.getValue()} />,
		meta: { sortable: true },
	}),

	columnHelper.accessor('unit', {
		header: 'Satuan',
		cell: (info) => <Text textAlign="center" whiteSpace="wrap" children={info.getValue()} />,
		meta: { sortable: true },
	}),

	columnHelper.accessor('description', {
		header: 'Deskripsi',
		cell: (info) => <Text noOfLines={2} whiteSpace="wrap" children={info.getValue()} />,
	}),

	columnHelper.accessor('isCalculable', {
		header: 'DSS Suports',
		cell: (info) =>
			info.getValue() ? (
				<TagWithIcon icon={IconCheck} children="Disupport" />
			) : (
				<TagWithIcon
					icon={IconAlertTriangle}
					colorScheme="red"
					children="Belum Disupport"
				/>
			),
		meta: { sortable: true },
	}),
];
