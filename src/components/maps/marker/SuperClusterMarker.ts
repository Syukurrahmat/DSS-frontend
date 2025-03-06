import L, { DivIcon } from 'leaflet';

const iconsChache: { [key: number]: DivIcon } = {};

export const getSuperClusterIcon = (count: number, dataLength: number) => {
	const size = 40 + (count / dataLength) * 40;
	if (!iconsChache[count]) {
		iconsChache[count] = L.divIcon({
			html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">${count}</div>`,
			iconAnchor: [size / 2, size / 2],
		});
	}
	return iconsChache[count];
};
