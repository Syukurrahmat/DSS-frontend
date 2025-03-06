import { NodeType } from '@/constants/data';
import { toFormatedDatetime } from '@/lib/dateFormating.utils';
import { Button, HStack, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import { IconExternalLink } from '@tabler/icons-react';
import { Marker, Popup } from 'react-leaflet'; //prettier-ignore
import { useNavigate } from 'react-router-dom';
import { TagNodeStatus } from '@/components/TagComponents';
import { MyMarkerProps } from '../../types';
import getNodesMarkerIcon from './NodeMarkerIcon';

export interface NodeMarkerProps {
	id: number;
	ownship: NodeType;
	name: string;
	isUptodate: boolean;
	lastDataSent?: string;
}

export function NodesMarker({ properties, ...rest }: MyMarkerProps<NodeMarkerProps>) {
	const { id, ownship, name, isUptodate, lastDataSent } = properties;
	const navigate = useNavigate();

	return (
		<Marker icon={getNodesMarkerIcon(ownship ? 'private' : 'public')} {...rest}>
			<Popup className="map-popup" offset={[0, -16]}>
				<VStack align="start">
					<Text fontSize="lg" fontWeight="600" textTransform="capitalize">
						{name}
					</Text>
					<TagNodeStatus value={isUptodate ? 'active' : 'inactive'} size="sm" />
					{!!lastDataSent && (
						<HStack spacing="1">
							<Text fontWeight="600">Data diperbarui pada : </Text>
							<Text>{toFormatedDatetime(lastDataSent)}</Text>
						</HStack>
					)}
					<Button
						rightIcon={<IconExternalLink size="16" />}
						colorScheme="blue"
						size="sm"
						lineHeight={8}
						children="Lihat detail"
						alignSelf='flex-end'
						onClick={() => navigate('/nodes/' + id)}
					/>
				</VStack>
			</Popup>
		</Marker>
	);
}
