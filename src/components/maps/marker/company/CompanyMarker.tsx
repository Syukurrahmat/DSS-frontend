import { CompanyType } from '@/constants/data';
import { toFormatedDatetime } from '@/lib/dateFormating.utils';
import { Button, Divider, HStack, Heading, Spacer, Tag, Text, VStack } from '@chakra-ui/react';
import { Marker, Popup } from 'react-leaflet';
import { TagCompanyType, TagNodeStatus } from '../../../TagComponents';
import { MyMarkerProps } from '../../types';
import { NodeWithValueProps } from '../node/NodeMarkerWithValue';
import getCompanyIconMarker from './CompanyMarkerIcon';
import { IconExternalLink, IconLayoutNavbarExpand } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export type PrivateNodes = {
	id: number;
	name: string;
	lastDataSent?: string;
	isUpTodate: boolean;
};

export interface CompanyMarkerProps {
	name: string;
	id: number;
	type: CompanyType;
	privateNodes?: PrivateNodes[];
	privateNodeWithValue?: NodeWithValueProps[];
}

export function CompanyMarker({ properties, ...rest }: MyMarkerProps<CompanyMarkerProps>) {
	const { id, name, type, privateNodeWithValue, privateNodes } = properties;
	const navigate = useNavigate();

	return (
		<Marker icon={getCompanyIconMarker(type)} {...rest}>
			<Popup className="map-popup" offset={[0, -16]}>
				<VStack align="start" spacing="2">
					<Heading size="sm">{name}</Heading>
					{privateNodeWithValue ? (
						<WithPrivateNodeWithValue data={privateNodeWithValue} />
					) : privateNodes ? (
						<WithPrivateNodes data={privateNodes} />
					) : (
						<>
							<TagCompanyType value={type} />
							<Button
								w="100%"
								rightIcon={<IconExternalLink size="16" />}
								colorScheme="blue"
								size="sm"
								lineHeight={8}
								children="Lihat detail"
								onClick={() => navigate('/users/companies/' + id)}
							/>
						</>
					)}
				</VStack>
			</Popup>
		</Marker>
	);
}

function WithPrivateNodes({ data }: { data: PrivateNodes[] }) {
	const navigate = useNavigate();

	return (
		<>
			<Divider />
			<VStack align="stretch">
				{data.map((e, i) => (
					<VStack key={i} spacing="2" align="start">
						<VStack  spacing="1" align="start">
							<HStack w="full">
								<Text fontWeight="600" fontSize="md" children={e.name} />
								<Spacer />
								<TagNodeStatus
									value={e.isUpTodate ? 'active' : 'inactive'}
									size="sm"
								/>
							</HStack>
							<Text>
								{e.lastDataSent
									? `Diperbarui pada ${toFormatedDatetime(e.lastDataSent)}`
									: 'Belum pernah mengirim data'}
							</Text>
						</VStack>
						<Button
							w="100%"
							rightIcon={<IconExternalLink size="16" />}
							colorScheme="blue"
							size="sm"
							lineHeight={8}
							children="Lihat detail"
							onClick={() => navigate('/nodes/' + e.id)}
						/>
					</VStack>
				))}
			</VStack>
		</>
	);
}

function WithPrivateNodeWithValue({ data }: { data: NodeWithValueProps[] }) {
	return (
		<>
			<Divider />
			<VStack>
				{data.map((e, i) => (
					<VStack key={i} align="start" w="full" spacing="1">
						<HStack w="full">
							<Text fontWeight="600" fontSize="md" children={e.name} />
							<Spacer />
							<Tag children={e.dataValue?.parameter} />
							<Tag
								colorScheme={e.dataValue?.color || 'gray'}
								children={e.dataValue?.value || '??'}
							/>
						</HStack>
						{!!e.dataValue?.datetime && (
							<Text>Diperbarui pada {toFormatedDatetime(e.dataValue?.datetime)}</Text>
						)}
					</VStack>
				))}
			</VStack>
		</>
	);
}
