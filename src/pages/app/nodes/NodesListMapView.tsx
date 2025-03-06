import MapView from '@/components/maps';
import { CompanyType } from '@/constants/data';
import { Coordinate } from '@/types/data-table';
import { Box, Skeleton } from '@chakra-ui/react'; //prettier-ignore
import { useEffect, useRef } from 'react';
import useSWR from 'swr';

const MapMaxHeight = 'calc(100dvh - 124px)';

type NodesListMapView = {
	coordinate: Coordinate;
	id: number;
	name: string;
	lastDataSent?: string;
	createdAt: string;
	owner: {
		id: 25;
		name: string;
		type: CompanyType;
	} | null;
	isUptodate: boolean;
	nodeType: {
		id: number;
		name: string;
	};
};

export default function NodesListMapView() {
	const { data } = useSWR<Paginated<NodesListMapView>>('/nodes?mapview=true');

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		containerRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}, []);

	const indoorNodeInCompanies =
		data &&
		Object.values(
			data.rows
				.filter((e) => e.owner)
				.reduce((acc: Record<number, any>, item) => {
					const { coordinate, owner, ...rest } = item;
					const { name, id, type } = owner!;

					if (!acc[id]) {
						acc[id] = {
							name,
							id,
							type,
							coordinate,
							privateNodes: [],
						};
					}
					acc[id].privateNodes.push(rest);
					return acc;
				}, {}),
		);

	return (
		<Box ref={containerRef}>
			{data ? (
				<MapView
					h={MapMaxHeight}
					companiesData={indoorNodeInCompanies}
					nodesData={data.rows
						.filter((e) => !e.owner)
						.map((e) => ({ ...e, ownship: e.owner ? 'private' : 'public' }))}
				/>
			) : (
				<Skeleton h={MapMaxHeight} rounded="md" />
			)}
		</Box>
	);
}
