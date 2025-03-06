import agricultureCompanyMarker from '@/assets/marker/company-marker-agriculture.svg';
import otherCompanyMarker from '@/assets/marker/company-marker-other.svg';
import restaurantCompanyMarker from '@/assets/marker/company-marker-restaurant.svg';
import retailStoreCompanyMarker from '@/assets/marker/company-marker-retailstore.svg';
import serviceCompanyMarker from '@/assets/marker/company-marker-service.svg';
import tofuCompanyMarker from '@/assets/marker/company-marker-tofufactory.svg';
import { CompanyType } from '@/constants/data';

import L, { BaseIconOptions } from 'leaflet';

export const markerIconOptions: BaseIconOptions = {
	iconAnchor: [16, 29],
	iconSize: [32, 32],
	className: 'map-marker',
};

const companyIconMarker: Record<CompanyType, L.Icon> = {
	tofufactory: new L.Icon({
		iconUrl: tofuCompanyMarker,
		...markerIconOptions,
	}),

	service: new L.Icon({
		iconUrl: serviceCompanyMarker,
		...markerIconOptions,
	}),

	agriculture: new L.Icon({
		iconUrl: agricultureCompanyMarker,
		...markerIconOptions,
	}),

	retailstore: new L.Icon({
		iconUrl: retailStoreCompanyMarker,
		...markerIconOptions,
	}),

	restaurant: new L.Icon({
		iconUrl: restaurantCompanyMarker,
		...markerIconOptions,
	}),

	other: new L.Icon({
		iconUrl: otherCompanyMarker,
		...markerIconOptions,
	}),
};

export default function getCompanyIconMarker(type: CompanyType) {
	return companyIconMarker[type] || companyIconMarker.tofufactory;
}
