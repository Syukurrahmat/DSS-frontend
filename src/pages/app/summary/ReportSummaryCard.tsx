import MyMap from '@/components/Maps';
import MyMarker from '@/components/Maps/marker';
import useUser from '@/hooks/useUser';
import { responsiveCardSize } from '@/utils/common.utils';
import { Alert, Card, CardBody, Flex, Grid, HStack, Icon, Select, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import { IconSpeakerphone, IconStar } from '@tabler/icons-react';
import { useState } from 'react';
import { RatingIconList } from '../Reports/ReportCard';

interface ReportSummaryCard {
	data: ReportSummary;
	company: CompanyData;
}

export function ReportSummaryCard({ data, company }: ReportSummaryCard) {
	const { screenType } = useUser();
	const [filter, setFilter] = useState(0);
	const { average, countPerStar, count, reports } = data;

	const ratingIcon = RatingIconList[Math.round(average) - 1];

	return (
		<Card size={responsiveCardSize} shadow="xs">
			<CardBody>
				{count ? (
					<Flex gap="4" direction={screenType == 'desktop' ? 'row' : 'column'  }>
						<VStack flex="1 1 0" align="stretch">
							<Alert
								colorScheme={ratingIcon.color.slice(0, -4)}
								fontSize="md"
								p="3"
								variant="top-accent"
								as={VStack}
							>
								<HStack
									fontWeight="600"
									fontSize="md"
									alignSelf="start"
								>
									<Icon as={IconStar} boxSize="16px" />
									<Text>Rating Aduan Rata Rata</Text>
								</HStack>
								<HStack pt="2" alignSelf="center">
									<Icon
										as={ratingIcon.icon}
										color={ratingIcon.color}
										boxSize="50px"
									/>
									<HStack align="baseline" spacing="1">
										<Text fontWeight="600" fontSize="3xl">
											{average.toFixed(2)}
										</Text>
										<Text>/5.00</Text>
									</HStack>
								</HStack>
								<Text>Total Aduan : {count} Aduan</Text>
							</Alert>

							<Text fontWeight="600">
								Jumlah aduan berdasarkan bintang
							</Text>
							<Grid
								w="full"
								gap="2"
								templateColumns="repeat(auto-fit, minmax(100px, 1fr))"
							>
								{countPerStar
									.map((e, i) => ({
										ratingIcon: RatingIconList[4 - i],
										rating: 5 - i,
										count: e,
									}))
									.map(({ ratingIcon, count, rating }) => (
										<VStack
											p="2"
											spacing="1"
											rounded="md"
											key={rating}
											bg={ratingIcon.color.slice(0, -4) + '.100'}
											cursor="pointer"
											_active={{
												bg: ratingIcon.color.slice(0, -4) + '.200',
											}}
											onClick={() => setFilter(rating)}
										>
											<HStack>
												<Text
													fontSize="xl"
													fontWeight="600"
													w="1ex"
													children={count}
												/>
												<Icon
													as={ratingIcon.icon}
													boxSize="30px"
													color={ratingIcon.color}
												/>
											</HStack>
											<Text>Bintang {rating}</Text>
										</VStack>
									))}
							</Grid>

							<HStack justify="space-between" mt="3">
								<Text fontWeight="600">Filter aduan di peta</Text>
								<Select
									value={filter.toString()}
									onChange={(e) => setFilter(parseInt(e.target.value))}
									w="140px"
									cursor="pointer"
								>
									{Array.from({ length: 6 }, (_, i) => (
										<option
											key={i}
											value={i}
											children={i ? 'Rating ' + i : 'Semua Rating'}
										/>
									))}
								</Select>
							</HStack>
						</VStack>

						<MyMap
							flex="2 1 0"
							minH="300px"
							marker={MyMarker.RatingMarker}
							scrollWheelZoom={false}
							companiesData={[company]}
							data={reports.filter((e) =>
								filter ? e.rating == filter : true
							)}
						/>
					</Flex>
				) : (
					<HStack justify="center" py="10" spacing="3" color="gray.500">
						<Icon as={IconSpeakerphone} boxSize="45px" />
						<Text fontSize="xl" fontWeight="500">
							Tidak Ada Aduan
						</Text>
					</HStack>
				)}
			</CardBody>
		</Card>
	);
}
