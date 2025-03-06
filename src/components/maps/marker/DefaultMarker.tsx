import redMarkerIconSvg from '@/assets/marker/mapMarker-red.svg';

import L from 'leaflet';
import { Marker } from 'react-leaflet'; //prettier-ignore

import { MyMarkerProps } from '../types';
import { markerIconOptions } from './node/NodeMarkerIcon';

export function DefaultMarker({ properties, ...rest }: MyMarkerProps<any>) {
	return (
		<Marker
			icon={
				new L.Icon({
					iconUrl: redMarkerIconSvg,
					...markerIconOptions,
				})
			}
			{...rest}
		/>
	);
}
