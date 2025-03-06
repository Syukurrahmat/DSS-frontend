import { Coordinate } from '@/types/data-table';
import { LatLngExpression, LatLngLiteral } from 'leaflet';
import { MarkerProps } from 'react-leaflet';
import { ClusterProperties } from 'supercluster';
import { MarkerType } from './marker';
import { CompanyMarkerProps } from './marker/company/CompanyMarker';

type AnyDataWithCoordinate = Record<any, any> & { coordinate: Coordinate };
type AnyDataWithLatLng = Record<any, any> & { coordinate: LatLngLiteral };

type MapViewData<T extends Record<any, any>, R extends Record<any, any> = {}> = T &
	R & {
		id: number;
	} & ({ coordinate: LatLngLiteral } | { coordinate: Coordinate });

type SuperClusterData<T extends Record<any, any>, R extends Record<any, any> = {}> = T &
	R & {
		id: number;
		coordinate: LatLngLiteral;
		marker : MarkerType
	};

export interface MyMarkerProps<T> extends MarkerProps {
	properties: T & ClusterProperties;
	position: LatLngExpression;
}
