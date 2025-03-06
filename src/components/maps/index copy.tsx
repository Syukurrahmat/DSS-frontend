import { DEFAULT_CENTER_MAP } from '@/constants/config';
import { Box, BoxProps } from '@chakra-ui/react';
import { LatLngLiteral } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { Circle, MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { getBonds, transformDataWithCoordinateToLatLng, transformToLatLngFormat } from './lib';
import MySuperCluster from './SuperCluster';
import { MapViewData } from './types';
import { CompanyMarkerProps } from './marker/company/CompanyMarker';
import { NodeMarkerProps } from './marker/node/NodeMarker';
import { NodeWithValueProps } from './marker/node/NodeMarkerWithValue';
import { RatingMarkerProps } from './marker/rating/RatingMarker';

import 'leaflet/dist/leaflet.css';
import './maps.css';

interface MapViewProps extends BoxProps {
	nodesData?: MapViewData<NodeMarkerProps>[];
	companiesData?: MapViewData<CompanyMarkerProps>[];
	complaintsData?: MapViewData<RatingMarkerProps>[];
	nodeWithValueData?: MapViewData<NodeWithValueProps>[];
	scrollWheelZoom?: boolean;
	centerAuto?: boolean;
	focusInOneCompany?: boolean;
	isEditing?: {
		coordinate: LatLngLiteral;
		onChange: (x: LatLngLiteral) => void;
	};
	circleBoundaryRadius?: number;
	mapRef?: any;
}

export default function MapView(props: MapViewProps) {
	const {
		scrollWheelZoom = true,
		centerAuto = true,
		mapRef,
		isEditing,
		focusInOneCompany,
		circleBoundaryRadius,
		nodesData,
		companiesData,
		complaintsData,
		nodeWithValueData,
		...rest
	} = props;

	const [showMarkerPicker, setShowMarkerPicker] = useState(false);

	const data = useMemo(
		() => [
			...(nodesData?.map((e) => transformToLatLngFormat(e, 'node')) || []),
			...(companiesData?.map((e) => transformToLatLngFormat(e, 'company')) || []),
			...(complaintsData?.map((e) => transformToLatLngFormat(e, 'rating')) || []),
			...(nodeWithValueData?.map((e) => transformToLatLngFormat(e, 'node:value')) || []),
		],
		[nodesData, companiesData, complaintsData, nodeWithValueData],
	);

	const MapObject = () => {
		const map = useMapEvents({
			dragend: () => {
				if (isEditing) isEditing.onChange(map.getCenter());
			},
			locationfound: ({ latlng }) => {
				if (isEditing) {
					map.flyTo(latlng, map.getZoom());
					isEditing.onChange(latlng);
				}
			},
		});

		useEffect(() => {
			data.length ? map.flyToBounds(getBonds(data)) : map.flyTo(DEFAULT_CENTER_MAP);
		}, [map]);

		useEffect(() => {
			if (isEditing) {
				map.flyTo(isEditing.coordinate);
				map.once('moveend', () => setShowMarkerPicker(true));
			} else {
				setShowMarkerPicker(false);
			}
		}, [map]);

		// useEffect(() => {
		// 	if (mapRef) mapRef.current = map;
		// 	if (focusInOneCompany && companiesData && companiesData[0]) {
		// 		map.flyTo(companiesData[0].coordinate, 17);
		// 	}
		// }, []);

		return null;
	};

	return (
		<Box rounded="md" h="350px" overflow="hidden" shadow="xs" position="relative" {...rest}>
			{isEditing && showMarkerPicker && <Box className="map-marker-centered" />}

			<MapContainer
				key={2}
				className="leaflet-map-container"
				zoom={13}
				center={centerAuto ? DEFAULT_CENTER_MAP : undefined}
				bounds={!centerAuto ? getBonds(data) : undefined}
				scrollWheelZoom={scrollWheelZoom}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<MapObject />
				<MySuperCluster data={data}  />

				{/* {circleBoundaryRadius && circleBoundaryRadius > 0 && companiesData?.length && (
					<Circle
						center={companiesData[0].coordinate}
						radius={circleBoundaryRadius}
						pathOptions={{
							fillColor: 'none',
							weight: 2,
							color: 'grey',
						}}
					/>
				)} */}
			</MapContainer>
		</Box>
	);
}
