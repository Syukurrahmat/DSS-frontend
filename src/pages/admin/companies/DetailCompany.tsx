import { ButtonViewDashboard } from '@/components/common/ChangeActiveDashButton';
import DeleteResourceButton from '@/components/common/DeleteReourceButton';
import HeadingWithIcon from '@/components/common/HeadingWithIcon';
import LoadingComponent from '@/components/common/LoadingComponent';
import SectionTitle from '@/components/common/SectionTitle';
import TagWithIcon from '@/components/common/TagWithIcon';
import UserCard from '@/components/managerCard';
import { TagCompanyType } from '@/components/Tags/index.tags';
import useUser from '@/hooks/useUser';
import { toFormatedDate } from '@/utils/dateFormating';
import { fetcher } from '@/utils/fetcher';
import { Box, Container, HStack, Heading, Spacer, Text } from '@chakra-ui/react'; //prettier-ignore
import { IconAddressBook, IconBuildingFactory2, IconCalendar, IconEdit, IconLock, IconTextCaption } from '@tabler/icons-react'; //prettier-ignore
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import CompanySubscribedNodesList from './DTCompanySubscribedNodes';
import EditGroupButton from './EditCompany';

export default function DetailCompany() {
	const { id } = useParams();
	const { user, roleIs } = useUser();

	const { data, mutate, error } = useSWR<CompanyDataPage>(
		`/companies/${id}`,
		fetcher
	);

	if (error) throw error;
	if (!data) return <LoadingComponent />;

	return (
		<Box>
			<HeadingWithIcon
				Icon={<IconBuildingFactory2 />}
				text="Detail Perusahaan"
			/>
			<Container mt="6" px="0" maxW="container.md">
				<HStack
					justify="space-between"
					align="start"
					wrap="wrap"
					spacing="6"
				>
					<Box>
						<Heading fontSize="3xl" children={data.name} />
						<HStack mt="2">
							<TagWithIcon
								icon={IconCalendar}
								colorScheme="blue"
								children={`Dibuat pada ${toFormatedDate(
									data.createdAt
								)}`}
							/>
							<TagCompanyType value={data.type} />
						</HStack>
						{['admin', 'gov'].includes(user.role) && (
							<UserCard mt="3" data={data.manager} label="manager" />
						)}
					</Box>
					<Spacer />
					<HStack>
						<ButtonViewDashboard
							alignSelf="start"
							companyId={data.companyId}
						/>
						{roleIs(['admin', 'manager']) && (
							<EditGroupButton
								data={data}
								mutate={mutate}
								colorScheme="blue"
								alignSelf="start"
								leftIcon={<IconEdit size="16" />}
								children={'Sunting Perusahaan'}
							/>
						)}
					</HStack>
				</HStack>

				<SectionTitle IconEl={IconAddressBook}>Alamat</SectionTitle>
				<Text>{data.address}</Text>

				<SectionTitle IconEl={IconTextCaption}>
					Deskripsi Perusahaan
				</SectionTitle>
				<Text>{data.description}</Text>

				<CompanySubscribedNodesList data={data} mutate={mutate} />

				{roleIs(['admin', 'manager']) && (
					<>
						<SectionTitle IconEl={IconLock}>Lainnya</SectionTitle>
						<DeleteResourceButton
							resource="Perusahaan"
							name={data.name}
							colorScheme="red"
							deleteApiUrl={'/companies/' + data.companyId}
							redirectPath="/companies"
						/>
					</>
				)}
			</Container>
		</Box>
	);
}
