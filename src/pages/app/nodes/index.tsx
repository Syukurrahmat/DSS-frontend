import DataTable from '@/components/data-table';
import { Flex } from '@chakra-ui/react'; //prettier-ignore
import { IconCircleDot } from '@tabler/icons-react'; //prettier-ignore
import { DTHeader } from '../users/DTHeader';
import { columnsPublicNodeTable, columPrivateNodeTable } from './DTColumns';
import NodesListMapView from './NodesListMapView';
import Statistic from './Statistic';
import MyTabList from '@/components/display/MyTablist';

  const tabsList = [
	{
		label: 'Daftar Node Publik',
		key: 'public',
		component: <DataTable apiUrl={'/nodes?ownship=public'} columns={columnsPublicNodeTable} />,
	},
	{
		label: 'Daftar Node Privat',
		key: 'private',
		component: <DataTable apiUrl={'/nodes?ownship=private'} columns={columPrivateNodeTable} />,
	},
	{
		label: 'Lihat Dalam Maps',
		key: 'map',
		component: <NodesListMapView />,
	},
];

export default function NodeManagement() {
	return (
		<Flex gap="2" flexDir="column">
			<DTHeader
				title="Daftar Node"
				iconTitle={IconCircleDot}
				addButtonLabel="Tambah Pengguna"
				onAddButtonPress={() => {}}
			/>
			<Statistic />
			<MyTabList tabsList={tabsList} />
		</Flex>
	);
}
