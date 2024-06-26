import { ISPUColor } from '@/utils/common.utils';
import { toFormatedDatetime } from '@/utils/dateFormating';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack, Tag, Text, VStack, Spacer, Heading, Icon, Button, Stack} from '@chakra-ui/react'; // prettier-ignore
import { IconCircleDot, IconHistory, IconMoodHappy } from '@tabler/icons-react';

interface MultiNodeISPU {
	data: NodeStat<ISPUValue[]>;
}

export default function MultiNodeISPU({ data }: MultiNodeISPU) {
	const { highest, lowest, average, list } = data;

	const highestISPUAverage = average.data.value[0];
	const avrColor = ISPUColor[highestISPUAverage.category];

	return (
		<>
			{/* Header */}
			<HStack w="full" spacing="4" p="2" bg={avrColor + '.100'} rounded="5">
				<VStack
					rounded="3"
					align="start"
					boxSize="95px"
					p="2"
					spacing="0"
					bg={avrColor + '.200'}
				>
					<Text fontStyle="italic" children="ISPU" />
					<Spacer />
					<Text
						textAlign="center"
						w="full"
						fontSize="4xl"
						fontWeight="700"
						children={highestISPUAverage.ispu}
					/>
				</VStack>

				<VStack align="start" spacing="2">
					<Heading as="p" size="lg">
						{highestISPUAverage.category}
					</Heading>
					<Tag>Polutan Utama : {highestISPUAverage.pollutant}</Tag>
					<HStack>
						<IconCircleDot size="16" />
						<Text fontSize="sm">Rerata dari {list.length} node</Text>
					</HStack>
				</VStack>
				<Spacer />
				<Icon
					boxSize="90px"
					strokeWidth="1.5px"
					color={avrColor + '.400'}
					as={IconMoodHappy}
				/>
			</HStack>

			{/* Tengah */}

			<Stack
				direction="row"
				spacing="4"
				w="full"
				justifyContent="space-evenly"
			>
				{[highest, lowest].map(({ data: dt, name }, i) => {

					const color = ISPUColor[dt.value[0].category];
					return (
						<VStack
							key={i}
							minW="200px"
							spacing="0"
							rounded="md"
							align="start"
							px="4"
							py="3"
							justify="center"
							bg={color + '.100'}
						>
							<Text fontWeight="500">
								{i ? 'Terendah' : 'Tertinggi'}
							</Text>
							<HStack w="full" justify="space-between">
								<Text
									fontSize="2xl"
									fontWeight={700}
									children={dt.value[0].ispu}
								/>
								<Tag bg={color + '.300'}>Aman</Tag>
							</HStack>
							<HStack spacing="1">
								<IconCircleDot size="16" />

								<Text
									w="full"
									noOfLines={1}
									fontSize="sm"
									children={name}
								/>
							</HStack>
						</VStack>
					);
				})}
			</Stack>
			<Text fontWeight="600" mt="2">
				Kualitas Udara Per Node
			</Text>
			<TableContainer shadow="xs" rounded="md" w="full">
				<Table variant="striped">
					<Thead>
						<Tr>
							<Th>Node</Th>
							<Th>ISPU</Th>
							<Th>Aksi</Th>
						</Tr>
					</Thead>
					<Tbody>
						{list.map(({ name, data : {datetime, value} }, i) => (
							<Tr key={i}>
								<Td>
									<Text fontWeight="600">{name}</Text>
									<Text fontSize="sm" color="gray.600">
										{toFormatedDatetime(datetime)}
									</Text>
								</Td>
								<Td>
									<Tag
										bg={ISPUColor[value[0].category] + '.300'}
										children={value[0].ispu}
									/>
									<Tag
										ml="2"
										bg={ISPUColor[value[0].category] + '.300'}
										children={value[0].category}
									/>
								</Td>
								<Td>
									<Button
										size="sm"
										colorScheme="blue"
										children="Detail ISPU"
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

			<Spacer />

			
		</>
	);
}
