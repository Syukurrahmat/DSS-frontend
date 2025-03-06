import { useHashBasedTabsIndex, usePathnameBasedTabsIndex } from '@/hooks/useHashBasedTabsIndex';
import { TablerIcon } from '@/types/type';
import { Box, chakra, Tab, TabList, Tabs } from '@chakra-ui/react'; //prettier-ignore
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingComponent from './LoadingComponent';

interface OutletTabListProps {
	tabsList: {
		label: string;
		key: string;
		icon?: TablerIcon;
	}[];
	path : string
}

export default function OutletTablist({ tabsList, path }: OutletTabListProps) {
	const [tabIndex, handleTabsChange] = usePathnameBasedTabsIndex(
		tabsList.map((e) => e.key),
		{ navigationPrefix: path },
	);

	return (
		<Tabs
			display="flex"
			flexDir="column"
			flexGrow="1"
			index={tabIndex}
			onChange={handleTabsChange}
			isLazy
			mt="-1.5"
		>
			<TabList flexWrap="wrap" rowGap="4px">
				{tabsList.map((e) => (
					<Tab key={e.key}>
						{e.icon && <e.icon size={20} />}
						<chakra.span ml="2"> {e.label}</chakra.span>
					</Tab>
				))}
			</TabList>
			<Box mt='3'>
				<Suspense fallback={<LoadingComponent />}>
					<Outlet />
				</Suspense>
			</Box>
		</Tabs>
	);
}
