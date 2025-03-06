import CompanyIcon from '@/components/display/CompanyIcon';
import { TagNodeStatus } from '@/components/TagComponents';
import { toFormatedDatetime } from '@/lib/dateFormating.utils';
import { DTNodes } from '@/types/data-table';
import { Button, HStack, Text } from '@chakra-ui/react';
import { IconExternalLink } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table'; //prettier-ignore
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper<DTNodes>();

export const columnsPublicNodeTable = [
	columnHelper.accessor('name', {
		header: 'Nama',
		cell: (info) => <Text>{info.getValue()}</Text>,
	}),

	columnHelper.accessor('isUptodate', {
		header: 'Status',
		cell: (info) => <TagNodeStatus value={info.getValue() ? 'active' : 'inactive'} />,
	}),

	columnHelper.accessor('address', {
		header: 'Alamat',
		cell: (info) => <Text noOfLines={2} whiteSpace="wrap" children={info.getValue()} />,
	}),

	columnHelper.accessor('lastDataSent', {
		header: 'Terakhir data dikirim',
		cell: (info) => toFormatedDatetime(info.getValue()) || '-',
	}),

	columnHelper.accessor('id', {
		header: 'Aksi',
		cell: (info) => (
			<Link to={'/nodes/' + info.getValue()}>
				<Button
					colorScheme="blue"
					size="sm"
					leftIcon={<IconExternalLink size="16" />}
					children="Detail"
				/>
			</Link>
		),
	}),
];

export const columPrivateNodeTable = [
	columnHelper.accessor('owner', {
		header: 'Perusahaan',
		cell: (info) => (
			<Link to={'/companies/' + info.getValue()!.id}>
				<HStack>
					<CompanyIcon type={info.getValue()!.type} />
					<Text>{info.getValue()!.name}</Text>
				</HStack>
			</Link>
		),
	}),
	...columnsPublicNodeTable.filter((e) => e.accessorKey !== 'address'),
];
