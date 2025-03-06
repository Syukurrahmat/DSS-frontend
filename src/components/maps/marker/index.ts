import { CompanyMarker } from './company/CompanyMarker';
import { DefaultMarker } from './DefaultMarker';
import { NodesMarker } from './node/NodeMarker';
import { NodeMarkerWithValue } from './node/NodeMarkerWithValue';
import { RatingMarker } from './rating/RatingMarker';

const MarkerList = {
	node: NodesMarker,
	company: CompanyMarker,
	'node:value': NodeMarkerWithValue,
	rating: RatingMarker,
	default: DefaultMarker,
};

export type MarkerType = keyof typeof MarkerList;
export default MarkerList;
