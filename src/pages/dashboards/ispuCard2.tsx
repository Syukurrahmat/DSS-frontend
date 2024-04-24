import {Card, CardBody, Stack, StackDivider} from '@chakra-ui/react'; // prettier-ignore
import SingleNodeISPUCard from '../app/dashboards/ispuCard/singleNodeISPUCard';
import { dashboardData } from '../../data/dashboardData';
import MutipleNodeISPUCard from '../app/dashboards/ispuCard/multipleNodeISPUCard';

export default function IspuCard2() {
	return (
		<Card size="md" w="full">
			<CardBody
				as={Stack}
				divider={<StackDivider borderColor="gray.200" />}
				direction="row"
				gap="4"
			>
				<SingleNodeISPUCard
					title="Kualitas Udara di dalam Pabrik"
					data={dashboardData.dashboardData.indoor}
				/>
				<MutipleNodeISPUCard title="Kualitas Udara di dalam Pabrik"/>
				
			</CardBody>
		</Card>
	);
}