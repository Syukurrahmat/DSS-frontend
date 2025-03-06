import DataTable from '@/components/data-table';
import NameWithAvatar from '@/components/display/NamewithAvatar';
import { toFormatedDate } from '@/lib/dateFormating.utils';
import { DTCitizens } from '@/types/data-table';
import { Button, Link, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import { IconExternalLink, IconUser } from '@tabler/icons-react'; //prettier-ignore
import { createColumnHelper } from '@tanstack/react-table'; //prettier-ignore
import { Link as RLink, useNavigate } from 'react-router-dom';
import { DTHeader } from '../DTHeader';

export default function CitizensResource() {
	const navigate = useNavigate();

	return (
		<VStack spacing="3" align="stretch">
			<DTHeader
				title="Daftar Masyarakat Umum"
				iconTitle={IconUser}
				addButtonLabel='Tambah Pengguna'
				onAddButtonPress={() => navigate('./create')}
			/>
			<DataTable apiUrl="/citizens" columns={columns} />
		</VStack>
	);
}


const columnHelper = createColumnHelper<DTCitizens>();

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
	columnHelper.accessor('address', {
		header: 'Alamat',
		cell: (info) => (
			<VStack align="start" spacing="1">
				<Text noOfLines={2}>{info.getValue()}</Text>
				<Text noOfLines={2}>
					{[
						info.row.original.village,
						info.row.original.subDistrict,
						info.row.original.city,
					].join(', ')}
				</Text>
			</VStack>
		),
	}),
	columnHelper.accessor('phone', {
		header: 'Telepon',
		cell: (info) => <Link href={'tel:+62' + info.getValue()}>{info.getValue()}</Link>,
	}),

	columnHelper.accessor('createdAt', {
		header: 'Registrasi pada',
		cell: (info) => toFormatedDate(info.getValue()),
		meta: { sortable: true },
	}),

	columnHelper.accessor('id', {
		header: 'Aksi',
		cell: (info) => (
			<RLink to={'/users/citizens/' + info.getValue()}>
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

const unverifiedUserColumn = columns.filter((e) => e.accessorKey !== 'id')