import notFoundImage from '@/assets/images/not-found-image.jpg';
import DeviceCardBase from '@/components/display/DeviceCardBase';
import SectionTitle from '@/components/display/SectionTitle';
import TagWithIcon from '@/components/display/TagWithIcon';
import { DTSensor } from '@/types/data-table';

import {
	Box,
	HStack,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { IconAirBalloon, IconTelescope } from '@tabler/icons-react';
import useSWR from 'swr';

export function SensorCard(props: DTSensor) {
	const { image, name, description, parameterCount } = props;

	return (
		<DeviceCardBase image={image}>
			<Text fontSize="lg" fontWeight="600">
				{name}
			</Text>
			<Text fontSize="sm" color="dimmed" noOfLines={2}>
				{description}
			</Text>
			<Spacer />
			<HStack>
				<TagWithIcon icon={IconAirBalloon}>
					{parameterCount} Parameter Terpantau
				</TagWithIcon>
			</HStack>
		</DeviceCardBase>
	);
}

export function NodeTypeCard(props: DTNodeType) {
	const { image, name, description, sensorCount, parameterCount } = props;
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<DeviceCardBase image={image} onClick={onOpen}>
				<Text fontSize="lg" fontWeight="600">
					{name}
				</Text>
				<Text fontSize="sm" color="dimmed" noOfLines={2}>
					{description}
				</Text>
				<Spacer />
				<HStack>
					<TagWithIcon colorScheme="blue" icon={IconTelescope}>
						{sensorCount} Sensor
					</TagWithIcon>
					<TagWithIcon icon={IconAirBalloon}>
						{parameterCount} Parameter Terpantau
					</TagWithIcon>
				</HStack>
			</DeviceCardBase>
			<Modal size="xl" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton size="lg" />
					<ModalHeader>Detail Tipe Node</ModalHeader>
					<DetailNodeType data={props} />
				</ModalContent>
			</Modal>
		</>
	);
}

function DetailNodeType({ data }: { data: DTNodeType }) {
	const { image, name, description, parameterCount, sensorCount } = data;
	const { data: detail } = useSWR<DetailNodeType>('/nodetypes/' + data.id);

	return (
		<ModalBody display="flex" flexDir="column">
			<Stack gap="3">
				<Image w="140px" rounded="md" fit="cover" h="140px" src={image || notFoundImage} />
				<Text fontSize="xl" fontWeight={600}>
					{name}
				</Text>
				<HStack>
					<TagWithIcon colorScheme="blue" icon={IconTelescope}>
						{sensorCount} Sensor
					</TagWithIcon>
					<TagWithIcon icon={IconAirBalloon}>
						{parameterCount} Parameter Terpantau
					</TagWithIcon>
				</HStack>
				<Text>{description}</Text>
			</Stack>
			<SectionTitle>Sensors</SectionTitle>
			<Stack>
				{detail?.sensors.map((sensor) => (
					<SensorItem key={sensor.id} data={sensor} />
				))}
			</Stack>
		</ModalBody>
	);
}

function SensorItem({ data }: { data: DetailNodeType['sensors'][number] }) {
	const { image, name, supportedMeasurements } = data;

	return (
		<HStack align="start" border="1px solid" borderColor="gray.200" rounded="md" p="2">
			<Image w="80px" rounded="md" fit="cover" h="80px" src={image || notFoundImage} />
			<Box>
				<Text fontWeight="600">{name}</Text>
				{/* <Text fontWeight="600">{supportedMeasurements }</Text> */}
			</Box>
		</HStack>
	);
}
