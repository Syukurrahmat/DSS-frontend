import {
	companyTypeAttr,
	eventLogStatusAttr,
	eventLogsTypeAttr,
	nodeStatusAttr,
	nodeTypeAttr,
	userRoleAttr,
} from '@/constants/constantsAttributes';
import { CompanyType, EventLogsStatus, EventLogsType, NodeStatus, NodeType, UserRole } from '@/constants/data';
import { TagLeftIcon, TagLabel, TagProps } from '@chakra-ui/react';
import { Tag } from '@chakra-ui/react';

interface MyTag<T> extends TagProps {
	value: T;
}

export const TagCompanyType = ({ value, ...rest }: MyTag<CompanyType>) => {
	const { color, name, icon } = companyTypeAttr[value] || companyTypeAttr.other;

	return (
		<Tag colorScheme={color} {...rest}>
			<TagLeftIcon as={icon} />
			<TagLabel>{name}</TagLabel>
		</Tag>
	);
};

export const TagNodeType = ({ value, ...rest }: MyTag<NodeType>) => {
	const { color, icon, name } = nodeTypeAttr[value] || nodeTypeAttr.public;

	return (
		<Tag colorScheme={color} variant="outline" {...rest}>
			<TagLeftIcon as={icon} />
			<TagLabel>{name}</TagLabel>
		</Tag>
	);
};

export const TagNodeStatus = ({ value, ...rest }: MyTag<NodeStatus>) => {
	const { color, icon, name } = nodeStatusAttr[value] || nodeStatusAttr.inactive;

	return (
		<Tag colorScheme={color} variant="outline" {...rest}>
			<TagLeftIcon as={icon} />
			<TagLabel>{name}</TagLabel>
		</Tag>
	);
};

export const TagUserRole = ({ value, ...rest }: MyTag<UserRole | 'unverified'>) => {
	const { color, icon, name } = userRoleAttr[value] || userRoleAttr['regular'];

	return (
		<Tag colorScheme={color} {...rest}>
			<TagLeftIcon as={icon} />
			<TagLabel>{name}</TagLabel>
		</Tag>
	);
};

export const TagEventLogType = ({ value, ...rest }: MyTag<EventLogsType>) => {
	const { color, icon, name } = eventLogsTypeAttr[value] || eventLogsTypeAttr.other

	return (
		<Tag colorScheme={color} {...rest}>
			<TagLeftIcon as={icon} />
			<TagLabel>{name}</TagLabel>
		</Tag>
	);
};

export const TagEventLogStatus = ({ value, ...rest }: MyTag<EventLogsStatus>) => {
	const { color, icon, name } = eventLogStatusAttr[value] || eventLogStatusAttr.inProgress

	return (
		<Tag colorScheme={color} {...rest}>
			<TagLeftIcon as={icon} />
			<TagLabel>{name}</TagLabel>
		</Tag>
	);
};
