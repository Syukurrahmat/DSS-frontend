import { TablerIcon } from '@/types/type';
import { HStack, Icon, Skeleton, StackProps, Text, VStack } from '@chakra-ui/react';

interface StatWithIcon extends StackProps {
	label: string;
	count?: number;
	icon: TablerIcon;
	color?: string;
	variant?: 'solid' | 'outline';
}

export function StatisticItem(props: StatWithIcon) {
	const { label, icon, count, color = 'blue', variant = 'outline', ...rest } = props;
	
	return (
		<VStack
			as={Skeleton}
			isLoaded={count !== undefined}
			p="2"
			justify="center"
			rounded="lg"
			spacing="0"
			sx={getStyleByVariant(color, variant)}
			{...rest}
		>
			<HStack>
				<Icon
					color={variant == 'outline' ? color + '.500' : 'white'}
					as={icon}
					boxSize="24px"
				/>
				<Text fontSize="2xl" fontWeight="600" textAlign="center">
					{count || 0}
				</Text>
			</HStack>
			<Text>{label}</Text>
		</VStack>
	);
}

const getStyleByVariant = (color: string, variant: StatWithIcon['variant']) => {
	if (variant == 'outline') {
		return {
			border: '2px solid',
			bg: color + '.50',
			borderColor: color + '.200',
		};
	} else {
		return {
			border: '2px solid',
			bg: color + '.400',
			justify: 'center',
			borderColor: color + '.400',
			color: 'white',
		};
	}
};
