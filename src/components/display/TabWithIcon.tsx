import { chakra, Tab } from '@chakra-ui/react'; //prettier-ignore
import { TablerIcon } from '@/types/type';
import { forwardRef } from 'react';

type TabWithIconItem = {
	label: string;
	icon: TablerIcon
};

export const TabsWithIcon = forwardRef<HTMLButtonElement, TabWithIconItem>(function TabsWithIcon(props, ref) {
	return (
		<Tab ref={ref}>
			<props.icon size={20} />
			<chakra.span ml="2"> {props.label}</chakra.span>
		</Tab>
	);
});