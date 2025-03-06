import DataTable from '@/components/data-table';
import NameWithAvatar from '@/components/display/NamewithAvatar';
import { toFormatedDate } from '@/lib/dateFormating.utils';
import { DTAdmin } from '@/types/data-table';
import { Button, Text, VStack } from '@chakra-ui/react';
import { IconExternalLink, IconUserBolt } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import { Link as RLink, useNavigate } from 'react-router-dom';
import { DTHeader } from '../DTHeader';

export default function AdminsResource() {
	const navigate = useNavigate();

	return (
		<VStack spacing="3" align="stretch">
			<DTHeader
				title="Daftar Admin"
				iconTitle={IconUserBolt}
				onAddButtonPress={() => navigate('./create')}
				addButtonLabel="Tambah Pengguna"
			/>
			<DataTable apiUrl="/admins" columns={columns} />
		</VStack>
	);
}

const columnHelper = createColumnHelper<DTAdmin>();

const columns = [
	columnHelper.accessor('name', {
		header: 'Nama',
		cell: (info) => (
			<NameWithAvatar
				name={info.getValue()}
				profilePicture={'info.row.original.profilePicture'}
				size="sm"
			/>
		),
		meta: { sortable: true },
	}),

	columnHelper.accessor('institution', {
		header: 'Institusi',
		cell: (info) => <Text whiteSpace="wrap">{info.getValue()}</Text>,
		meta: { sortable: true },
	}),

	columnHelper.accessor('createdAt', {
		header: 'Registrasi pada',
		cell: (info) => toFormatedDate(info.getValue()),
		meta: { sortable: true },
	}),

	columnHelper.accessor('id', {
		header: 'Aksi',
		cell: (info) => (
			<RLink to={'/users/admins/' + info.getValue()}>
				<Button
					colorScheme="blue"
					size="sm"
					leftIcon={<IconExternalLink size="16" />}
					children="Detail"
				/>
			</RLink>
		),
	}),
];

