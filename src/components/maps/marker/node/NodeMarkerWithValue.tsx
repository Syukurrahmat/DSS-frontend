import { toFormatedDatetime } from '@/lib/dateFormating.utils';
import { HStack, Spacer, Tag, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import { CircleMarker, Popup, Tooltip } from 'react-leaflet'; //prettier-ignore
import { MyMarkerProps } from '../../types';

type DataValue = {
	value: number;
	datetime: string;
	color: string;
	parameter: string;
	unit: string;
};

export type NodeWithValueProps = {
	name: string;
	dataValue: DataValue | null;
};

export function NodeMarkerWithValue(props: MyMarkerProps<NodeWithValueProps>) {
	const { properties, ...rest } = props;
	const { name, dataValue } = properties;

	return (
		<CircleMarker
			center={rest.position}
			pathOptions={{
				color: `var(--chakra-colors-${dataValue?.color || 'gray'}-500)`,
				weight: 2.2,
			}}
			radius={18}
			{...rest}
		>
			<Popup className="map-popup" offset={[0, -16]}>
				<VStack spacing="1" align="end">
					{dataValue ? (
						<DataValue nodeName={name} dataValue={dataValue} />
					) : (
						<Text>Node tidak uptodate</Text>
					)}
				</VStack>
			</Popup>

			<Tooltip
				className="tooltip-display-value"
				direction="center"
				children={<Text stroke="1px red">{formatNumber(dataValue) || '??'}</Text>}
				permanent
			/>
		</CircleMarker>
	);
}

function DataValue({ nodeName, dataValue }: { nodeName: string; dataValue: DataValue }) {
	const { value, datetime, parameter, color, unit } = dataValue;

	return (
		<>
			<HStack>
				<Text fontWeight="600" fontSize="md" children={nodeName} />
				<Spacer />
				{value !== undefined && (
					<>
						<Tag children={parameter} />
						<Tag
							colorScheme={color || 'gray'}
							children={value + (unit ? ' ' + unit : '')}
						/>
					</>
				)}
			</HStack>

			{!!datetime && <Text>Diperbarui pada {toFormatedDatetime(datetime)}</Text>}
			{value === undefined && <Text alignSelf="start">Tidak Ada Data</Text>}
		</>
	);
}

function formatNumber(number: any) {
	return typeof number !== 'number' ? '' : number % 1 ? number.toFixed(1) : number.toString();
}
