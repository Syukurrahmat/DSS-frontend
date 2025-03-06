import TagWithIcon from '@/components/display/TagWithIcon';
import { toFormatedDate } from '@/lib/dateFormating.utils';
import { Avatar, Box, Divider, HStack, Heading, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import { IconPhoto } from '@tabler/icons-react';
import { Marker, Popup } from 'react-leaflet'; //prettier-ignore
import { MyMarkerProps } from '../../types';
import { getRatingMarkerIcon } from './RatingMarkerIcon';

export interface RatingMarkerProps {
	rating: number;
	creator: {
		name: string;
		profilePicture?: string;
	};
	createdAt: string;
	message: string;
	images: string[];
}

export function RatingMarker({ properties, ...rest }: MyMarkerProps<RatingMarkerProps>) {
	return (
		<Marker icon={getRatingMarkerIcon(properties.rating)} {...rest}>
			<Popup className="map-popup" offset={[0, -16]}>
				<VStack align="start" maxW="200px">
					<HStack>
						<Avatar
							name={properties.creator.name}
							src={properties.creator.profilePicture}
							boxSize="32px"
							size="sm"
						/>
						<Box>
							<Heading size="md" fontSize="lg">
								{properties.creator.name}
							</Heading>
							<Text>{toFormatedDate(properties.createdAt)}</Text>
						</Box>
					</HStack>
					<Divider borderColor="gray.500" />
					<Text fontSize="md">{properties.message}</Text>
					{!!properties.images && !!properties.images.length && (
						<TagWithIcon icon={IconPhoto} variant="outline" colorScheme="orange">
							{properties.images.length} Gambar dilampirkan{' '}
						</TagWithIcon>
					)}
				</VStack>
			</Popup>
		</Marker>
	);
}
