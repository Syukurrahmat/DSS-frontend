import GMapsButton from '@/components/button/GMapsButton';
import DataTable from '@/components/data-table';
import CompanyIcon from '@/components/display/CompanyIcon';
import { TagCompanyType } from '@/components/TagComponents';
import { toFormatedDate } from '@/lib/dateFormating.utils';
import { DTCompanies } from '@/types/data-table';
import { Button, HStack, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import { IconAlignLeft, IconBuildingFactory2, IconExternalLink, IconMap } from '@tabler/icons-react'; //prettier-ignore
import { createColumnHelper } from '@tanstack/react-table'; //prettier-ignore
import { useState } from 'react';
import { Link as RLink, useNavigate } from 'react-router-dom';
import { DTHeader } from '../DTHeader';
import CompanyListMapView from './mapView';

type Mode = 'list' | 'map';

export default function CompaniesResource() {
	const navigate = useNavigate();
	const [mode, setMode] = useState<Mode>('list');

	return (
		<VStack spacing="3" align="stretch">
			<DTHeader
				title="Daftar Perusahaan"
				iconTitle={IconBuildingFactory2}
				addButtonLabel="Tambah Pengguna"
				onAddButtonPress={() => navigate('./create')}
				additionalButton={
					<SwithModeButton
						mode={mode}
						onClick={() => setMode((prev) => (prev === 'list' ? 'map' : 'list'))}
					/>
				}
			/>
			{mode === 'list' ? (
				<DataTable apiUrl="/companies" columns={columns} />
			) : (
				<CompanyListMapView />
			)}
		</VStack>
	);
}

const SwithModeButton = ({ mode, onClick }: { mode: Mode; onClick: () => void }) => (
	<Button
		colorScheme="blue"
		variant="ghost"
		leftIcon={mode === 'list' ? <IconMap size={20} /> : <IconAlignLeft size={20} />}
		children={mode === 'list' ? 'Lihat Dalam Peta' : 'Lihat Dalam Daftar'}
		onClick={onClick}
	/>
);

const columnHelper = createColumnHelper<DTCompanies>();

const columns = [
	columnHelper.accessor('name', {
		header: 'Nama',
		cell: (info) => (
			<HStack spacing="3">
				<CompanyIcon type={info.row.original.type} />
				<Text>{info.getValue()}</Text>
			</HStack>
		),
		meta: { sortable: true },
	}),
	columnHelper.accessor('type', {
		header: 'Jenis',
		cell: (info) => <TagCompanyType value={info.getValue()} />,
		meta: { sortable: true },
	}),
	columnHelper.accessor('address', {
		header: 'Alamat',
		cell: (info) => (
			<Text lineHeight="1.5" noOfLines={2} whiteSpace="wrap">
				{info.getValue()}
			</Text>
		),
	}),
	columnHelper.accessor('coordinate', {
		header: 'Lokasi',
		cell: (info) => <GMapsButton coordinate={info.getValue()} />,
	}),

	columnHelper.accessor('createdAt', {
		header: 'Registrasi pada',
		cell: (info) => toFormatedDate(info.getValue()),
		meta: { sortable: true },
	}),

	columnHelper.accessor('id', {
		header: 'Aksi',
		cell: (info) => (
			<RLink to={'/users/companies/' + info.getValue()}>
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

