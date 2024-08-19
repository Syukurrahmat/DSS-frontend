import { Box, HStack, Spacer, Tag, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import moment from 'moment';

interface CustomTooltip {
	dataKeyTypeAndFunc: any[];
	tickFormat: string;
	getPropertiesFunc?: (c: string) => { colorScheme: string };
	active: boolean;
	payload: any;
	label: string;
	unit?: string;
	tooltipLabel?: string;
}

export function SingleTrenTooltip({
	active,
	payload,
	label,
	tickFormat,
	tooltipLabel,
	unit,
	getPropertiesFunc,
	dataKeyTypeAndFunc,
}: CustomTooltip) {
	if (active && payload && payload.length) {
		const category = dataKeyTypeAndFunc[0].func(payload[0].payload)?.category;
		const colorScheme = getPropertiesFunc
			? getPropertiesFunc(category).colorScheme
			: 'gray';

		return (
			<VStack align="stretch" bg="white" shadow="xs" rounded="sm" p="3">
				<Text fontWeight="600">
					Pukul {moment(label).format(tickFormat)}
				</Text>

				<HStack w="full">
					<Text>{tooltipLabel} : </Text>
					<Spacer />
					<Tag colorScheme={colorScheme}>
						{parseFloat(payload[0].value.toFixed(2))} {unit}
					</Tag>
					{!!category && <Tag colorScheme={colorScheme}>{category}</Tag>}
				</HStack>
			</VStack>
		);
	}
}

export function MultipleTrenTooltip({
	active,
	payload,
	label,
	tickFormat,
	unit,
	getPropertiesFunc,
	tooltipLabel,
	dataKeyTypeAndFunc,
}: CustomTooltip) {
	if (active && payload && payload.length) {
		return (
			<VStack align="stretch" bg="white" shadow="xs" rounded="sm" p="3">
				<Text fontWeight="600">
					{tooltipLabel} rata-rata pada {moment(label).format(tickFormat)}
				</Text>
				<VStack align="stretch" spacing="1">
					{payload.map((e: any, i: number) => {
						const category = dataKeyTypeAndFunc[i].func(e.payload)?.category; //prettier-ignore
						const colorScheme = getPropertiesFunc
							? getPropertiesFunc(category).colorScheme
							: 'gray';

						return (
							<HStack px="1">
								<Box bg="blue.600" boxSize="5px" rounded="md" />
								<Text>{e.name}</Text>
								<Spacer />
								<HStack mt="1">
									<Tag colorScheme={colorScheme}>
										{parseFloat(e.value.toFixed(2))} {unit}
									</Tag>
									{!!category && (
										<Tag colorScheme={colorScheme}>{category}</Tag>
									)}
								</HStack>
							</HStack>
						);
					})}
				</VStack>
			</VStack>
		);
	}
}
