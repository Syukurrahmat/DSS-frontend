import { TablerIcon } from '@/types/type';
import { Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';

interface ITagWithIcon extends TagProps {
	icon: TablerIcon;
}

export default function TagWithIcon({ icon, ...rest }: ITagWithIcon) {
	return (
		<Tag size="md" alig variant="subtle" colorScheme="green" {...rest}>
			<TagLeftIcon boxSize="16px" as={icon} />
			<TagLabel lineHeight='1em'>{rest.children}</TagLabel>
		</Tag>
	);
}
