import DataTable from '@/components/DataTable';
import {
	getPrivateNodesColumns,
	getSubscribedNodesColumns,
} from '@/components/DataTable/commonColumn';
import EditInMapInputGroup from '@/components/Form/EditInMapInputGroup';
import MyMap from '@/components/Maps';
import NodeSubscription from '@/components/common/AddNodeSubscription';
import SectionTitle from '@/components/common/SectionTitle';
import useConfirmDialog from '@/hooks/useConfirmDialog';
import useUser from '@/hooks/useUser';
import { useMyToasts } from '@/utils/common.utils';
import { myAxios } from '@/utils/fetcher';
import { Box, Button, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import { IconBuilding, IconCirclePlus, IconTrees, IconUsersGroup } from '@tabler/icons-react'; //prettier-ignore
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyedMutator, mutate } from 'swr';

interface CompSubscribedNodes {
	data: CompanyDataPage;
	mutate: KeyedMutator<CompanyDataPage>;
}

export default function CompanySubscribedNodesList(props: CompSubscribedNodes) {
	const { data, mutate: dataPageMutate } = props;
	const { companyId } = data;

	const [nodesDataCtx, setNodeDataCtx] = useState<null | any[]>(null);
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedCoordinate, setEditedCoordinate] = useState(data.coordinate);

	const confirmDialog = useConfirmDialog();
	const navigate = useNavigate();
	const toast = useMyToasts();
	const { user, roleIs, roleIsNot } = useUser();

	const companyUpdateURL = `/companies/${companyId}`;
	const dtNodeSubsURL = `/companies/${companyId}/nodes`;
	const dtNodePrivateURL = `/companies/${companyId}/private-nodes`;

	const onRemoveNodeSubs = (nodeId: number) => {
		confirmDialog({
			title: 'Hapus Pengikuti Node',
			message: 'Anda yakin hendak menghapus node ini dari daftar langganan',
			confirmButtonColor: 'red',
			onConfirm: () =>
				myAxios
					.delete(`${dtNodeSubsURL}/${nodeId}`)
					.then(() => {
						toast.success('Node berhasil di-unsubcribe');
						mutate(
							(e) => typeof e === 'string' && e.startsWith(dtNodeSubsURL)
						);
					})
					.catch(() => {
						toast.success('Node gagal di-unsubcribe');
					}),
		});
	};

	const onSubmitEditingCoordinate = async () => {
		setIsSubmiting(true);

		myAxios
			.patch(companyUpdateURL, { coordinate: editedCoordinate })
			.then(() => {
				toast.success('Lokasi Perusahaan berhasil diperbarui');
				dataPageMutate({ ...data, coordinate: editedCoordinate });
			})
			.catch(() => {
				toast.error('Lokasi Perusahaan gagal diperbarui');
			})
			.finally(() => {
				setIsEditing(false);
				setIsSubmiting(false);
			});
	};

	const nodeSubscriptionColumns = useMemo(
		() => getSubscribedNodesColumns(user.role, onRemoveNodeSubs),
		[]
	);

	const nodePrivateColumns = useMemo(() => getPrivateNodesColumns(), []);

	return (
		<>
			<SectionTitle IconEl={IconUsersGroup}>
				Lokasi Perusahaan dan Node yang dikuti
			</SectionTitle>

			<Box>
				<EditInMapInputGroup
					canEdit={roleIsNot(['gov', 'regular'])}
					coordinate={data.coordinate}
					isEditingState={[isEditing, setIsEditing]}
					editedCoordinateState={[editedCoordinate, setEditedCoordinate]}
					isSubmiting={isSubmiting}
					handleSubmitEditedCoordinate={onSubmitEditingCoordinate}
				/>
				<MyMap
					w="full"
					mt="4"
					h="300px"
					companiesData={[data]}
					data={nodesDataCtx || []}
					outline={isEditing ? '3px solid' : ''}
					outlineColor="orange.300"
					isEditing={
						!isEditing
							? undefined
							: {
									coordinate: editedCoordinate || data.coordinate,
									onChange: (x) => setEditedCoordinate([x.lat, x.lng]),
							  }
					}
				/>
			</Box>

			<VStack align="start" spacing="6" mt="6">
				<Box w="full">
					<HStack wrap='wrap' justify="space-between" mb="4" align="start" w="full">
						<Box>
							<HStack mb="1">
								<Icon as={IconBuilding} boxSize="20px" />
								<Heading size="md" fontWeight="600">
									Node Privat
								</Heading>
							</HStack>
							<Text>
								Daftar node yang terpasang dilingkungan perusahaan Anda
							</Text>
						</Box>
						{roleIs(['admin', 'manager']) && (
							<Button
								leftIcon={<IconCirclePlus size="18" />}
								colorScheme="blue"
								children="Tambah Node Private"
								onClick={() =>
									navigate('./create-node', {
										state: {
											company: {
												name: data.name,
												companyId: data.companyId,
												type: data.type,
											},
										},
									})
								}
							/>
						)}
					</HStack>

					<DataTable
						apiUrl={dtNodePrivateURL}
						columns={nodePrivateColumns}
						emptyMsg={['Belum ada Node', 'Tambahkan Node sekarang']}
						hiddenPagination={true}
					/>
				</Box>
				<Box w="full">
					<HStack wrap='wrap' justify="space-between" mb="4" align="start" w="full">
						<Box>
							<HStack mb="1">
								<Icon as={IconTrees} boxSize="20px" />
								<Heading size="md" fontWeight="600">
									Node Publik
								</Heading>
							</HStack>
							<Text>Daftar node publik yang diikuti perusahaan ini</Text>
						</Box>

						{roleIs(['admin', 'manager']) && (
							<NodeSubscription
								subsInfo={{
									type: 'company',
									companyData: data,
								}}
							>
								<Button
									leftIcon={<IconCirclePlus size="18" />}
									colorScheme="blue"
									children="Tambah Node Publik"
								/>
							</NodeSubscription>
						)}
					</HStack>

					<DataTable
						apiUrl={dtNodeSubsURL}
						columns={nodeSubscriptionColumns}
						setDataContext={setNodeDataCtx}
						emptyMsg={['Belum ada Node', 'Tambahkan Node sekarang']}
						hiddenPagination={true}
					/>
				</Box>
			</VStack>
		</>
	);
}
