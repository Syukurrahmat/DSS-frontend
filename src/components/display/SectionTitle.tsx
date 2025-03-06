import { TablerIcon } from '@/types/type';
import {
	Icon as CakraIcon,
	HStack,
	Heading,
	HeadingProps,
	Stack,
	StackProps,
} from '@chakra-ui/react';

interface ISectionTitle extends HeadingProps {
	IconEl?: TablerIcon;
}

export default function SectionTitle({ IconEl, ...rest }: ISectionTitle) {
	return (
		<HStack mt="4" pb="2" mb="2" borderBottom="1px solid" borderColor="gray.300">
			{IconEl && <CakraIcon as={IconEl} boxSize="20px" />}
			<Heading fontSize="xl" fontWeight="500" {...rest} />
		</HStack>
	);
}

interface SectionWithTitleProps extends StackProps {
	IconEl?: TablerIcon;
	title: string;
}

export function SectionWithTitle({ IconEl, title, children, ...rest }: SectionWithTitleProps) {
	return (
		<Stack as='section' spacing="3" mt="8">
			<HStack  pb="2" borderBottom="1px solid" borderColor="gray.300">
				{IconEl && <CakraIcon as={IconEl} boxSize="20px" />}
				<Heading fontSize="xl" fontWeight="500" children={title} />
			</HStack>
			<Stack spacing="2" {...rest}>
				{children}
			</Stack>
		</Stack>
	);
}
