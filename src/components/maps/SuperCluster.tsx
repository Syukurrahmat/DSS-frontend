import { useCallback, useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import Supercluster, { ClusterProperties } from 'supercluster';
import useSupercluster from 'use-supercluster';
import MarkerList, { MarkerType } from './marker';
import { getSuperClusterIcon } from './marker/SuperClusterMarker';
import { AnyDataWithLatLng, MapViewData, SuperClusterData } from './types';

export interface SuperClusterProps<T extends {}> {
	data: SuperClusterData<T>[];
}

type useUserClusterPropType = SuperClusterData<{}> & ClusterProperties;
export type SCProperties<T> = (T & ClusterProperties) | (ClusterProperties & Supercluster.AnyProps);

export default function MySuperCluster({ data }: SuperClusterProps<{}>) {
	const maxZoom = 22;
	const [bounds, setBounds] = useState<number[]>();
	const [zoom, setZoom] = useState(12);
	const map = useMap();

	const updateMap = useCallback(() => {
		const b = map.getBounds();
		setBounds([
			b.getSouthWest().lng,
			b.getSouthWest().lat,
			b.getNorthEast().lng,
			b.getNorthEast().lat,
		]);
		setZoom(map.getZoom());
	}, [map, setZoom, setBounds]);

	const onMove = useCallback(() => {
		updateMap();
	}, [map]);

	useEffect(() => {
		updateMap();
	}, [map]);

	useEffect(() => {
		map.on('move', onMove);
		return () => {
			map.off('move', onMove);
		};
	}, [map, onMove]);

	const { clusters, supercluster } = useSupercluster<useUserClusterPropType>({
		// @ts-ignore
		points: data.map((point) => ({
			type: 'Feature',
			properties: {
				cluster_id: point.id,
				...point,
			},
			geometry: {
				type: 'Point',
				coordinates: [point.coordinate.lng, point.coordinate.lat],
			},
		})),
		bounds: bounds as any,
		zoom: zoom,
		options: { radius: 100, maxZoom: 17 },
	});

	return (
		<>
			{clusters.map(({ properties, geometry }) => {
				const [longitude, latitude] = geometry.coordinates;
				const {
					cluster: isCluster,
					point_count: pointCount,
					cluster_id: clusterId,
				} = properties;

				if (isCluster) {
					return (
						<Marker
							key={clusterId}
							position={[latitude, longitude]}
							icon={getSuperClusterIcon(pointCount, data.length)}
							eventHandlers={{
								click: () => {
									const expansionZoom = Math.min(
										// @ts-ignore
										supercluster.getClusterExpansionZoom(clusterId),
										maxZoom,
									);
									map.setView([latitude, longitude], expansionZoom, {
										animate: true,
									});
								},
							}}
						/>
					);
				}

				const MarkerComponent = MarkerList[properties.marker as MarkerType];
				return (
					<MarkerComponent
						key={properties.marker + '-' + properties.id}
						position={[latitude, longitude]}
						properties={properties as any}
					/>
				);
			})}
		</>
	);
}
