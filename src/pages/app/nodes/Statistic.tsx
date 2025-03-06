import { StatisticItem } from '@/pages/app/nodes/StatisticItem';
import { nodeStatusAttr, nodeTypeAttr } from '@/constants/constantsAttributes';
import { NodesOverview } from '@/types/dataModel';
import { AbsoluteCenter, Box, Divider, Flex, Grid, Text } from '@chakra-ui/react'; //prettier-ignore
import { IconCircleDot } from '@tabler/icons-react'; //prettier-ignore
import { ReactNode } from 'react';
import useSWR from 'swr';

export default function Statistic() {
	const { data } = useSWR<NodesOverview>('/nodes/overview');
	const statusList = ['active', 'inactive'] as const;
	const ownshipList = ['public', 'private'] as const;

	return (
		<Flex mt="2" gap="2" direction={['column', 'row']} justify="space-between" align="stretch">
			<StatisticItem
				flexBasis={['100px', '150px', null, '200px']}
				height="initial"
				icon={IconCircleDot}
				count={data?.totalNodes}
				label="Total Node"
				variant="solid"
				bg="blue.400"
			/>

			<StatisticGroup label="Status Node">
				{statusList.map((status) => {
					const { color, name, icon } = nodeStatusAttr[status];

					return (
						<StatisticItem
							key={status}
							flex="1 0 180px"
							icon={icon}
							color={color}
							count={data?.status.find((e) => e.status == status)?.count}
							label={name}
						/>
					);
				})}
			</StatisticGroup>
			<StatisticGroup label="Kepemilikan Node">
				{ownshipList.map((ownship) => {
					const { color, name, icon } = nodeTypeAttr[ownship];

					return (
						<StatisticItem
							key={ownship}
							flex="1 0 180px"
							icon={icon}
							color={color}
							count={data?.ownship.find((e) => e.ownship == ownship)?.count}
							label={name}
						/>
					);
				})}
			</StatisticGroup>
		</Flex>
	);
}

function StatisticGroup({ label, children }: { label: string; children: ReactNode }) {
	return (
		<Box flex="1 0 100px" key={label} px="2" rounded="md">
			<Box position="relative" py="2">
				<Divider borderColor="gray.300" />
				<AbsoluteCenter bg="#F9F9F9" px="2">
					<Text
						fontSize="sm"
						textAlign="center"
						fontWeight="500"
						mb="1"
						children={label}
					/>
				</AbsoluteCenter>
			</Box>
			<Grid gap="3" mt="2" gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))">
				{children}
			</Grid>
		</Box>
	);
}
