import { Coordinate } from '@/types/data-table';
import { latLngBounds, LatLngExpression, LatLngLiteral } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { MarkerType } from './marker';
import { MapViewData } from './types';

export function transformDataWithCoordinateToLatLng<T extends Record<any, any>>(
	data: T & { coordinate: Coordinate },
) {
	const { coordinate, ...rest } = data;
	return {
		...rest,
		coordinate: { lat: coordinate.latitude, lng: coordinate.longitude } as LatLngLiteral,
	};
}

export function transformCoordinateToLatLng(coordinate: Coordinate) {
	return { lat: coordinate.latitude, lng: coordinate.longitude } as LatLngLiteral;
}

export function transformToLatLngFormat<T extends Record<any, any>>(
	{ coordinate, ...e }: MapViewData<T>,
	marker: MarkerType,
) {
	let latLngCoordinate: LatLngLiteral;

	if ('lat' in coordinate && 'lng' in coordinate) {
		latLngCoordinate = coordinate as LatLngLiteral;
	} else {
		const coord = coordinate as Coordinate;

		latLngCoordinate = {
			lat: coord.latitude,
			lng: coord.longitude,
		};
	}

	return {
		...e,
		marker: marker,
		coordinate: latLngCoordinate,
	};
}

export const getBonds = (point: { coordinate: LatLngLiteral }[]) => {
	if (point.length === 0) return latLngBounds([0, 0], [0, 0]);

	let x_min = point[0].coordinate.lat;
	let y_min = point[0].coordinate.lng;
	let x_max = point[0].coordinate.lat;
	let y_max = point[0].coordinate.lng;

	for (let i = 1; i < point.length; i++) {
		let x = point[i].coordinate.lat;
		let y = point[i].coordinate.lng;
		if (x < x_min) x_min = x;
		if (x > x_max) x_max = x;
		if (y < y_min) y_min = y;
		if (y > y_max) y_max = y;
	}

	return latLngBounds([x_min - 0.002, y_max - 0.002], [x_max + 0.002, y_min + 0.002]);
};
interface CoordinateGetter {
	onDragend: (x: { lat: number; lng: number }) => any;
	latlng?: LatLngExpression;
}

export function CoordinateGetter({ onDragend }: CoordinateGetter) {
	const map = useMapEvents({
		dragend: () => {
			const { lat, lng } = map.getCenter();
			onDragend({ lat, lng });
		},
		locationfound: ({ latlng }) => {
			map.flyTo(latlng, map.getZoom());
			onDragend({ lat: latlng.lat, lng: latlng.lng });
		},
	});

	return null;
}
