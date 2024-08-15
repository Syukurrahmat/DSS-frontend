import MyISPUChart from '@/components/Chart/ISPUChart';
import MyLineChart from '@/components/Chart/MyLineChart';
import MyButtonRadio from '@/components/common/ButtonRadio';
import { Button, Card, CardBody, CardHeader, Center, Divider, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'; //prettier-ignore
import { useState } from 'react';
import { AirParamList } from './airParamList';

interface TrenCard {
	title: string;
	tren: TrenItem[];
	paramList: AirParamList[];
}

const INDOOR = 'Di dalam perusahaan';
const OUTDOOR = 'Di sekitar perusahaan';
const BOTH = 'Keduanya';

export function TrenCard({ title, tren, paramList }: TrenCard) {
	const [views, setViews] = useState([INDOOR, OUTDOOR]);

	const mappedViews = views.map((e) => (e == INDOOR ? 'indoor' : 'outdoor'));

	return (
		<Card size="sm" shadow="xs" p="1">
			<CardHeader fontWeight="600" fontSize="lg" children={title} />
			{tren.length ? (
				<>
					<CardBody pt="0">
						<Tabs isLazy variant="unstyled" colorScheme="teal" size="sm">
							<TabList gap="2">
								{paramList.map((e, i) => (
									<Tab
										rounded="md"
										as={Button}
										size="sm"
										colorScheme="teal"
										border="1px solid"
										borderColor="teal.500"
										_selected={{
											bg: 'teal.500',
											color: 'white',
											_hover: {
												bg: 'teal.600',
											},
										}}
										variant="outline"
										children={e.name}
										key={i}
									/>
								))}
								<Spacer />
								<MyButtonRadio
									options={[INDOOR, OUTDOOR, BOTH]}
									value={views.length == 2 ? BOTH : views[0]}
									onChange={(e) => {
										setViews(([pre]) => {
											if (e == BOTH)
												return [
													pre,
													pre == INDOOR ? OUTDOOR : INDOOR,
												];
											return [e];
										});
									}}
								/>
							</TabList>
							<Divider mt="4" />
							<TabPanels>
								{paramList.map((param, i) => (
									<TabPanel key={i} h="440px">
										{param.type == 'bar' ? (
											<MyISPUChart
												data={tren || []}
												withBrush={true}
												tickFormat="DD MMM YYYY"
												offsetDomain="day"
												dataKeyTypeAndFunc={mappedViews.map((t) =>
													param.dataKeyTypeAndFunc(t)
												)}
											/>
										) : (
											<MyLineChart
												data={tren || []}
												withBrush={true}
												tickFormat="DD MMM YYYY"
												dataKeyTypeAndFunc={mappedViews.map((t) =>
													param.dataKeyTypeAndFunc(t)
												)}
											/>
										)}
									</TabPanel>
								))}
							</TabPanels>
						</Tabs>
					</CardBody>
				</>
			) : (
				<Center w="full" pt="5" pb="8">
					<Text fontWeight="600" color="gray.500" fontSize="xl">
						Tidak Ada Data
					</Text>
				</Center>
			)}
		</Card>
	);
}