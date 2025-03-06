import MapView from '@/components/maps';
import { CompanyType } from '@/constants/data';
import { Coordinate } from '@/types/data-table';
import { Box, Skeleton } from '@chakra-ui/react'; //prettier-ignore
import { useEffect, useRef } from 'react';
import useSWR from 'swr';

const MapMaxHeight = 'calc(100dvh - 125px)';

type CompaniesListMapView = {
	coordinate: Coordinate;
	id: number;
	name: string;
	type: CompanyType;
	
};

export default function CompanyListMapView() {
	const { data } = useSWR<Paginated<CompaniesListMapView>>('/companies?mapview=true');

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		containerRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
		console.log('dd')
	}, []);

	return (
		<Box ref={containerRef}>
			{data ? (
				<MapView
					h={MapMaxHeight}
					companiesData={data.rows}
				/>
			) : (
				<Skeleton h={MapMaxHeight} rounded="md" />
			)}
		</Box>
	);
}
