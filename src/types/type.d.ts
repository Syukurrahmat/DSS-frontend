import { Icon, IconProps } from "@tabler/icons-react";
import { KeyedMutator } from "swr";

type TablerIcon = React.ForwardRefExoticComponent<
	Omit<IconProps, 'ref'> & React.RefAttributes<Icon>
>;

type DataWithCoordinate = {
	[key: string]: any;
	coordinate: number[];
};

type DataAndMutateProp<T> = {
	data: Partial<T>;
	mutate?: KeyedMutator<any>;
};
