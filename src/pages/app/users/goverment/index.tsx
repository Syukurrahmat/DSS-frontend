import DataTable from '@/components/data-table';
import NameWithAvatar from '@/components/display/NamewithAvatar';
import { toFormatedDate } from '@/lib/dateFormating.utils';
import { DTGoverment } from '@/types/data-table';
import { Badge, Button, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import { IconExternalLink, IconUserShield } from '@tabler/icons-react'; //prettier-ignore
import { createColumnHelper } from '@tanstack/react-table'; //prettier-ignore
import { Link as RLink, useNavigate } from 'react-router-dom';
import { DTHeader } from '../DTHeader';

export default function GovermentsResource() {
	const navigate = useNavigate();

	return (
		<VStack spacing="3" align="stretch">
			<DTHeader
				title="Daftar Pemerintah"
				iconTitle={IconUserShield}
				addButtonLabel="Tambah Pengguna"
				onAddButtonPress={() => navigate('./create')}
			/>
			<DataTable apiUrl="/goverments" columns={columns} />
		</VStack>
	);
}

const columnHelper = createColumnHelper<DTGoverment>();

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

	columnHelper.accessor('position', {
		header: 'Jabatan',
		cell: (info) => <Text whiteSpace="wrap">{info.getValue()}</Text>,
	}),

	columnHelper.accessor('institutionLevel', {
		header: 'Level',
		cell: (info) => <Badge whiteSpace="wrap">{info.getValue()}</Badge>,
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
			<RLink to={'/users/goverments/' + info.getValue()}>
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

