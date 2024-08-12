import DataTable from '@/components/DataTable';
import InputSearch from '@/components/Form/inputSearch';
import { TagCompanyType } from '@/components/Tags/index.tags';
import SectionTitle from '@/components/common/SectionTitle';
import { companyTypeAttr } from '@/constants/enumVariable';
import { useApiResponseToast } from '@/hooks/useApiResponseToast';
import useConfirmDialog from '@/hooks/useConfirmDialog';
import { usemyToasts } from '@/utils/common.utils';
import { toFormatedDate } from '@/utils/dateFormating';
import { myAxios } from '@/utils/fetcher';
import { Button, Center, HStack, Icon, IconButton, Spacer, Tag, Text } from '@chakra-ui/react'; //prettier-ignore
import { IconBuildingFactory2, IconExternalLink, IconTrash } from '@tabler/icons-react'; //prettier-ignore
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Link as RLink } from 'react-router-dom';
import { KeyedMutator, mutate } from 'swr';

const columnHelper = createColumnHelper<DTSubscribedCompanies>();

interface UserSubsList {
	mutate: KeyedMutator<any>;
	data: NodeDataPage;
}

export default function CompanySubsctiptionsList({
	data,
	mutate: dataPageMutate,
}: UserSubsList) {
	let { nodeId, countCompanySubscribtion } = data;
	const confirmDialog = useConfirmDialog();
	const apiURL = `/nodes/${nodeId}/companies`;
	const toast = usemyToasts();

	const handleDeleteSubs = (companyId: number) => {
		confirmDialog({
			title: 'Hapus Usaha',
			message: 'Hapus pengguna dari daftar pelanggan node ' + data.name,
			confirmButtonColor: 'red',
			onConfirm: async () =>
				myAxios
					.delete(`${apiURL}/${companyId}`)
					.then(() => {
						mutate((e) => typeof e == 'string' && e.startsWith(apiURL));
						dataPageMutate();
						toast.success('Berhasil menghapus subscription pengguna');
					})
					.catch((e) => {
						console.log(e);
						toast.error('Gagal menghapus subscription pengguna');
					}),
		});
	};

	const handleDeleteAllSubs = () => {
		confirmDialog({
			title: 'Hapus Semua Usaha',
			message: 'Hapus semua usaha dari daftar pelanggan node ' + data.name,
			confirmButtonColor: 'red',
			onConfirm: async () =>
				myAxios
					.delete(`${apiURL}`)
					.then(() => {
						mutate((e) => typeof e == 'string' && e.startsWith(apiURL));
						dataPageMutate();
						toast.success('Berhasil menghapus subscription pengguna');
					})
					.catch(() => {
						toast.error('Gagal menghapus subscription pengguna');
					}),
		});
	};

	const columns = useMemo(
		() => [
			columnHelper.accessor('name', {
				header: 'Nama',
				cell: (info) => {
					const { color, icon } = companyTypeAttr[info.row.original.type];

					return (
						<HStack spacing="3">
							<Center
								rounded="md"
								border="2px solid"
								borderColor={color + '.200'}
								color={color + '.500'}
								p="2"
								children={<Icon as={icon} boxSize="18px" />}
							/>
							<Text>{info.getValue()}</Text>
						</HStack>
					);
				},
				meta: { sortable: true },
			}),

			columnHelper.accessor('type', {
				header: 'Jenis ',
				cell: (info) => <TagCompanyType value={info.getValue()} />,
				meta: { sortable: true },
			}),

			columnHelper.accessor('joinedAt', {
				header: 'Berlangganan sejak',
				cell: (info) => toFormatedDate(info.getValue()),
				meta: { sortable: true },
			}),

			columnHelper.accessor('companyId', {
				header: 'Aksi',
				cell: (info) => (
					<HStack>
						<IconButton
							size="sm"
							colorScheme="red"
							icon={<IconTrash size="16" />}
							aria-label="Hapus"
							onClick={() => handleDeleteSubs(info.getValue())}
						/>
						<RLink to={'/companies/' + info.getValue()}>
							<Button
								colorScheme="blue"
								size="sm"
								leftIcon={<IconExternalLink size="16" />}
								children="Lihat Usaha"
							/>
						</RLink>
					</HStack>
				),
			}),
		],
		[]
	);

	return (
		<>
			<SectionTitle IconEl={IconBuildingFactory2}>
				Daftar usaha yang mensubscribe
				<Tag colorScheme="blue" ml="2">
					{countCompanySubscribtion || 0}
				</Tag>
			</SectionTitle>

			{!!countCompanySubscribtion && (
				<HStack mt="4">
					<Button
						colorScheme="red"
						leftIcon={<IconTrash size="18" />}
						onClick={handleDeleteAllSubs}
						children="Hapus Semua Usaha"
					/>
					<Spacer />
					<InputSearch
						rounded="md"
						bg="white"
						placeholder="Cari Usaha"
						_onSubmit={null}
					/>
				</HStack>
			)}

			<DataTable
				mt="4"
				apiUrl={apiURL}
				columns={columns}
				emptyMsg={['Belum ada Usaha']}
			/>
		</>
	);
}
