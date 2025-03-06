import redMarkerIconSvg from '@/assets/marker/mapMarker-red.svg';
import yellowMarkerIconSvg from '@/assets/marker/mapMarker-yellow.svg';
import { NodeType } from '@/constants/data';

import L, { BaseIconOptions } from 'leaflet';

export const markerIconOptions: BaseIconOptions = {
	iconAnchor: [16, 29],
	iconSize: [32, 32],
	className: 'map-marker',
};

export const nodesMarkers: Record<NodeType, L.Icon> = {
	private: new L.Icon({
		iconUrl: yellowMarkerIconSvg,
		...markerIconOptions,
	}),
	public: new L.Icon({
		iconUrl: redMarkerIconSvg,
		...markerIconOptions,
	}),
};

export default function getNodesMarkerIcon(type: NodeType) {
	return nodesMarkers[type] || nodesMarkers.public;
}
