import { useDisclosureWithContent } from '@/hooks/useDisclosureWithContent';
import { Box, Divider, Stack, Text } from '@chakra-ui/react';
import { IconRouter } from '@tabler/icons-react';
import useSWR from 'swr';
import { DTHeader } from '../../users/DTHeader';
import { NodeTypeCard } from '../DeviceCard';
import DetailNodeTypes from './DetailNodeTypes';

export default function NodeTypeSection() {
	const { data } = useSWR<Paginated<DTNodeType>>('/nodetypes');
	const detailDisclousure = useDisclosureWithContent<DTNodeType>();

	const row = data?.rows || [];

	return (
		<Stack gap="4" flex="1">
			<Stack spacing="1">
				<DTHeader
					title="Tipe Node"
					iconTitle={IconRouter}
					addButtonLabel="Tambah Tipe Node"
					onAddButtonPress={() => {}}
				/>
				<Text color="dimmed">
					Sebuah node adalah perangkat yang terdiri dari beberapa sensor yang dikemas
					dalam satu unit untuk memantau kualitas udara.
				</Text>
			</Stack>
			<Divider />
			<Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap="4">
				{row.map((nodetype) => (
					<NodeTypeCard key={nodetype.id} {...nodetype} />
				))}
			</Box>
			<DetailNodeTypes {...detailDisclousure} />
		</Stack>
	);
}
