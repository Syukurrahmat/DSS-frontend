import { useHashBasedTabsIndex } from '@/hooks/useHashBasedTabsIndex';
import { TablerIcon } from '@/types/type';
import { chakra, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'; //prettier-ignore

interface MyTabListProps {
	tabsList: {
		label: string;
		key: string;
		component: JSX.Element;
		icon?: TablerIcon;
	}[];
}

export default function MyTabList({ tabsList }: MyTabListProps) {
	const [tabIndex, handleTabsChange] = useHashBasedTabsIndex(tabsList.map((e) => e.key));

	return (
		<Tabs
			display="flex"
			flexDir="column"
			flexGrow="1"
			index={tabIndex}
			onChange={handleTabsChange}
			isLazy
			mt='-1.5'
		>
			<TabList flexWrap="wrap" rowGap="4px">
				{tabsList.map((e) => (
					<Tab key={e.key}>
						{e.icon && <e.icon size={20} />}
						<chakra.span ml="2"> {e.label}</chakra.span>
					</Tab>
				))}
			</TabList>
			<TabPanels flexGrow="1">
				{tabsList.map((e) => (
					<TabPanel px="0" pb="0" key={e.key}>
						{e.component}
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
}
