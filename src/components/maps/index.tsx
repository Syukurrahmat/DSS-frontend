import { DEFAULT_CENTER_MAP } from '@/constants/config';
import { Box, BoxProps } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { getBonds, transformToLatLngFormat } from './lib';
import { CompanyMarkerProps } from './marker/company/CompanyMarker';
import { NodeMarkerProps } from './marker/node/NodeMarker';
import { NodeWithValueProps } from './marker/node/NodeMarkerWithValue';
import { RatingMarkerProps } from './marker/rating/RatingMarker';
import MySuperCluster from './SuperCluster';
import { MapViewData } from './types';

import { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './maps.css';

interface MapViewProps extends BoxProps {
	nodesData?: MapViewData<NodeMarkerProps>[];
	companiesData?: MapViewData<CompanyMarkerProps>[];
	complaintsData?: MapViewData<RatingMarkerProps>[];
	nodeWithValueData?: MapViewData<NodeWithValueProps>[];
	scrollWheelZoom?: boolean;
	focusInOneCompany?: boolean;

	circleBoundaryRadius?: number;
	mapRef?: React.MutableRefObject<Map>;
}

export default function MapView(props: MapViewProps) {
	const {
		scrollWheelZoom = true,
		mapRef,
		nodesData,
		companiesData,
		complaintsData,
		nodeWithValueData,
		...rest
	} = props;
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
		const map = useMapEvents({});

		useEffect(() => {
			data.length ? map.flyToBounds(getBonds(data)) : map.flyTo(DEFAULT_CENTER_MAP);
		}, [map]);

		useEffect(() => {
			if (mapRef) mapRef.current = map;
		}, [map]);
		return null;
	};

	return (
		<Box className="map-wrapper" {...rest}>
			<MapContainer
				key={2}
				className="leaflet-map-container"
				zoom={13}
				bounds={getBonds(data)}
				scrollWheelZoom={scrollWheelZoom}
			>
				<MapObject />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MySuperCluster data={data} />
			</MapContainer>
		</Box>
	);
}
