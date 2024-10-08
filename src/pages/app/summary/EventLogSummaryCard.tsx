import {
	eventLogStatusAttr,
	eventLogsTypeAttr,
} from '@/constants/enumVariable';
import useUser from '@/hooks/useUser';
import { responsiveCardSize } from '@/utils/common.utils';
import { Alert, Box, Card, CardBody, Center, Flex, Grid, HStack, Icon, Spacer, Text, VStack } from '@chakra-ui/react'; //prettier-ignore
import idLocale from '@fullcalendar/core/locales/id';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { IconCalendarEvent, IconClipboardOff, IconNotebook } from '@tabler/icons-react'; //prettier-ignore
import moment from 'moment';
import { useRef } from 'react';
import { CardEventLog } from '../EventLogs/CardEventLog';
import { eventsMapping, renderEventContent } from '../EventLogs/EventCalendar';

interface EventLogSummaryCard {
	data: EventLogsSummary;
	periode: string;
	dateRange: string[];
}

export function EventLogSummaryCard({
	data,
	periode,
	dateRange,
}: EventLogSummaryCard) {
	const { screenType } = useUser();
	const { eventLogs, count : {countStatus, countType, all : countAll}, eventIdLongestEvent: longestEventId,} = data; //prettier-ignore

	const production = countType.find((e) => e.type == 'production');

	return (
		<Card size={responsiveCardSize} shadow="xs">
			<CardBody>
				{countAll ? (
					<Flex
						direction={screenType == 'desktop' ?  'row-reverse' : 'column'}
						gap="4"
					>
						<VStack flex="1 0 0" align="stretch">
							<Alert
								variant="top-accent"
								bg="blue.100"
								p="3"
								roundedTop="sm"
								roundedBottom="md"
								fontSize="md"
								justifyContent="space-between"
								flexWrap="wrap"
								gap="6"
							>
								<HStack align="end">
									<Center
										p="2"
										rounded="md"
										bg="blue.200"
										boxSize="50px"
										fontSize="3xl"
										fontWeight="600"
										children={countAll}
									/>
									<Box>
										<Text>Total</Text>
										<Text fontWeight="600">
											Aktivitas di bulan ini
										</Text>
									</Box>
								</HStack>
								<VStack align="start">
									{countStatus.map((e, i) => {
										const { icon, name } =
											eventLogStatusAttr[e.status];

										return (
											<HStack key={i}>
												<Center bg="blue.200" p="1" rounded="md">
													<Icon as={icon} boxSize="20px" />
												</Center>
												<Text>
													{e.count || 'Tidak ada'} aktivitas{' '}
													{name.toLowerCase()}
												</Text>
											</HStack>
										);
									})}
								</VStack>
							</Alert>
							<Text fontWeight="600">Kegiatan Produksi</Text>
							<HStack px="3" justify="space-evenly" wrap="wrap">
								<HStack>
									<Center
										p="3"
										rounded="md"
										bg="green.100"
										h="50px"
										gap="2"
									>
										<Center bg="green.200" p="2" rounded="md">
											<Icon as={IconNotebook} boxSize="20px" />
										</Center>
										<Text
											fontSize="3xl"
											fontWeight="600"
											children={production?.count || 0}
										/>
										<Text
											fontWeight="600"
											children="Aktivitas produksi"
										/>
									</Center>
								</HStack>
								<HStack>
									<Center
										p="3"
										rounded="md"
										bg="green.100"
										h="50px"
										gap="2"
									>
										<Center bg="green.200" p="2" rounded="md">
											<Icon as={IconCalendarEvent} boxSize="20px" />
										</Center>

										<Text
											fontSize="3xl"
											fontWeight="600"
											children={production?.days || 0}
										/>
										<Text fontWeight="600" children="Hari produksi" />
									</Center>
								</HStack>
							</HStack>
							{countType.filter(
								(e) => e.count && e.type !== 'production'
							).length > 0 && (
								<>
									<Text fontWeight="600">
										Jumlah Aktivitas berdasarkan jenis aktivitas
									</Text>

									<Grid
										justifyContent="center"
										templateColumns="repeat(auto-fit, minmax(160px, 120px))"
										gap="2"
									>
										{countType
											.filter(
												(e) => e.count && e.type !== 'production'
											)
											.map((e) => {
												const { color, icon, name } =
													eventLogsTypeAttr[e.type];

												return (
													<Box
														p="2"
														bg={color + '.100'}
														rounded="md"
														key={e.type}
													>
														<HStack justify="center" spacing="1">
															<Text
																fontSize="2xl"
																fontWeight="600"
																children={e.count}
															/>
															<Icon
																as={icon}
																color={color + '.500'}
																boxSize="23px"
															/>
														</HStack>
														<Text textAlign="center">
															{e.days} Hari {name.toLowerCase()}
														</Text>
													</Box>
												);
											})}
									</Grid>
								</>
							)}

							<Spacer />

							{!!longestEventId && (
								<>
									<Text fontWeight="600">Aktivitas terlama</Text>
									<CardEventLog
										event={
											eventLogs.find(
												(e) => e.eventLogId == longestEventId
											)!
										}
									/>
								</>
							)}
						</VStack>

						{screenType !== 'desktop' && (
							<Text fontWeight="600">Kegiatan Dalam Kalender</Text>
						)}

						<Box
							rounded="lg"
							flex="1 0 0"
							h="auto"
							minH="400px"
							overflow="hidden"
						>
							<Calendar
								periode={periode}
								data={data}
								dateRange={dateRange}
							/>
						</Box>
					</Flex>
				) : (
					<HStack
						justify="center"
						w="full"
						py="10"
						spacing="3"
						color="gray.500"
					>
						<Icon as={IconClipboardOff} boxSize="45px" />
						<Text fontSize="xl" fontWeight="500">
							Tidak Ada Catatan Aktivitas
						</Text>
					</HStack>
				)}
			</CardBody>
		</Card>
	);
}

function Calendar({ dateRange, periode, data }: EventLogSummaryCard) {
	const [_, endDate] = dateRange;
	const calendarRef = useRef<any>();
	const isIncludeToday = moment(endDate)
		.startOf(periode as any)
		.isSame(moment().startOf(periode as any));

	return (
		<>
			<FullCalendar
				firstDay={0}
				ref={calendarRef}
				events={eventsMapping(data.eventLogs)}
				fixedWeekCount={false}
				initialDate={endDate}
				plugins={[dayGridPlugin]}
				initialView="dayGridYear"
				height="100%"
				monthStartFormat={{
					month: 'short',
					day: 'numeric',
				}}
				validRange={{
					start: dateRange[0],
					end: isIncludeToday ? moment().toDate() : dateRange[1],
				}}
				locale={idLocale}
				headerToolbar={false}
				eventContent={(e) => renderEventContent(e, true)}
			/>

			<style>
				{`.fc-day.fc-day-disabled {
					border : 0px;
					padding : 0px
					max-height : 0px !important;
				}
				.fc-day.fc-day-disabled *{
					display : none;
					max-height : 0px !important;
					border : 0px
				}
				`}
			</style>
		</>
	);
}
