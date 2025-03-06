import { DTSensor } from '@/types/data-table';
import { Box, Divider, Stack, Text } from '@chakra-ui/react';
import { IconTelescope } from '@tabler/icons-react';
import useSWR from 'swr';
import { DTHeader } from '../../users/DTHeader';
import { SensorCard } from '../DeviceCard';

export default function SensorsSection() {
	const { data } = useSWR<Paginated<DTSensor>>('/sensors');

	const row = data?.rows || [];

	return (
		<Stack gap="4" flex="1">
			<Stack spacing="1">
				<DTHeader
					title="Sensor"
					iconTitle={IconTelescope}
					addButtonLabel="Tambah Sensor"
					onAddButtonPress={() => {}}
				/>
				<Text color="dimmed">
					Sensor adalah komponen utama dalam node yang berfungsi untuk mendeteksi dan
					mengukur parameter udara
				</Text>
			</Stack>
			<Divider />
			<Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap="4">
				{row.map((sensor) => (
					<SensorCard key={sensor.id} {...sensor} />
				))}
			</Box>
		</Stack>
	);
}
