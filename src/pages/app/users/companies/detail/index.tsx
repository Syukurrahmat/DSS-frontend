import { ButtonViewDashboard } from '@/components/button/ChangeActiveDashButton';
import DeleteResourceButton from '@/components/button/DeleteReourceButton';
import GMapsButton from '@/components/button/GMapsButton';
import HeadingWithIcon from '@/components/display/HeadingWithIcon';
import LoadingComponent from '@/components/display/LoadingComponent';
import { ProfilePicture } from '@/components/display/ProfilePicture';
import { SectionWithTitle } from '@/components/display/SectionTitle';
import MapView from '@/components/maps';
import { TagCompanyType } from '@/components/TagComponents';
import { useUser } from '@/context/user/useUser';
import { DetailCompany } from '@/types/data/users';
import { Box, Button, Container, HStack, Heading, Link, Spacer, Stack, Text } from '@chakra-ui/react'; //prettier-ignore
import { IconAddressBook, IconBuildingFactory2, IconEdit, IconId, IconLock, IconMail, IconPhone, IconTextCaption } from '@tabler/icons-react'; //prettier-ignore
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import EditCompanyButton from './EditCompany';

export default function DetailCompanyPage() {
	const { id } = useParams();
	const { user, roleIs } = useUser();

	const { data, mutate, error } = useSWR<DetailCompany>(`/companies/${id}`);

	if (error) throw error;
	if (!data) return <LoadingComponent />;

	return (
		<Box>
			<HeadingWithIcon Icon={<IconBuildingFactory2 />} text="Detail Perusahaan" />
			<Container mt="5" px="0" maxW="container.md">
				<Stack
					spacing="6"
					align="center"
					direction={{ base: 'column', sm: 'row' }}
					justify="center"
				>
					<ProfilePicture name={data.name} src={data.user.profilePicture} />
					<Box flex="1 0 0" w="full">
						<TagCompanyType value={data.type} />
						<Heading my="1" fontSize="2xl">
							{data.name}
						</Heading>
						<HStack>
							<IconId size="16" />
							<Text>{data.permitNumber}</Text>
						</HStack>
						<HStack>
							<IconMail size="16" />
							<Link href={'mailto:' + data.user.email}>{data.user.email}</Link>
						</HStack>
						<HStack>
							<IconPhone size="16" />
							<Link href={'tel:' + data.phone}>{data.phone}</Link>
						</HStack>
					</Box>
					<HStack alignSelf="flex-start">
						{roleIs(['admin']) && (
							<ButtonViewDashboard alignSelf="start" companyId={0} />
						)}
						{roleIs(['admin', 'manager']) && (
							<EditCompanyButton
								data={data}
								mutate={mutate}
								colorScheme="blue"
								alignSelf="start"
								leftIcon={<IconEdit size="16" />}
								children={'Sunting Perusahaan'}
							/>
						)}
					</HStack>
				</Stack>

				<SectionWithTitle IconEl={IconTextCaption} title="Deskripsi Perusahaan">
					<Text>{data.description}</Text>
				</SectionWithTitle>

				<SectionWithTitle IconEl={IconAddressBook} title="Alamat">
					<Text>{data.address}</Text>
				</SectionWithTitle>
				<SectionWithTitle IconEl={IconAddressBook} title="Lokasi Perusahaan" gap="2">
					<HStack justify="space-between" w="full" wrap="wrap">
						<GMapsButton size="md" coordinate={data.coordinate}>
							Buka lokasi Perusahaan di Gmaps
						</GMapsButton>
						<Spacer />
						{roleIs(['admin']) && (
							<Button
								colorScheme="yellow"
								leftIcon={<IconEdit size="18" />}
								children="Sunting lokasi perusahaan"
							/>
						)}
					</HStack>
					<MapView companiesData={[data]} />
				</SectionWithTitle>

				{roleIs(['admin', 'manager']) && (
					<SectionWithTitle IconEl={IconLock} title="Lainnya">
						<DeleteResourceButton
							w="fit-content"
							resource="Perusahaan"
							name={data.name}
							colorScheme="red"
							deleteApiUrl={'/companies/' + data.id}
							redirectPath="/companies"
						/>
					</SectionWithTitle>
				)}
			</Container>
		</Box>
	);
}
