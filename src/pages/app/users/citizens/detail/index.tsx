import DeleteResourceButton from '@/components/button/DeleteReourceButton';
import HeadingWithIcon from '@/components/display/HeadingWithIcon';
import { ProfilePicture } from '@/components/display/ProfilePicture';
import { SectionWithTitle } from '@/components/display/SectionTitle';
import { TagUserRole } from '@/components/TagComponents';
import { useUser } from '@/context/user/useUser';
import { DetailCitizens } from '@/types/data/users';
import { Box, Container, HStack, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { IconAddressBook, IconEdit, IconId, IconLock, IconMail, IconPhone, IconTextCaption, IconUser } from '@tabler/icons-react'; //prettier-ignore
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import EditPasswordButton from '../../EditUserPass';
import EditCitizenProfileButton from './EditProfile';
import VerticalTable from '@/components/display/VerticalTable';

export default function DetailUser() {
	const { id } = useParams();
	const { user, roleIs } = useUser();
	const isMe = user.profileId === +id!;

	const { data, mutate } = useSWR<DetailCitizens>(`/citizens/${id}`);

	// if (error) throw error;
	if (!data) return <Text>loading slurrr</Text>;

	return (
		<Box>
			<HeadingWithIcon Icon={<IconUser />} text="Detail Akun" />
			<Container mt="5" maxW="container.md" px="0">
				<Stack
					spacing="6"
					align="center"
					direction={{ base: 'column', sm: 'row' }}
					justify="center"
				>
					<ProfilePicture name={data.name} src={data.user.profilePicture} />

					<Box flex="1 0 0" w="full">
						<TagUserRole value={data.user.role} />
						<Heading my="1" fontSize="2xl">
							{data.name}
						</Heading>
						<HStack>
							<IconId size="16" />
							<Text>{data.nik}</Text>
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
					{roleIs('admin') && (
						<EditCitizenProfileButton
							flexShrink="0"
							colorScheme="blue"
							alignSelf="start"
							leftIcon={<IconEdit size="16" />}
							children={'Sunting Profil'}
							data={data}
							mutate={mutate}
						/>
					)}
				</Stack>
				<SectionWithTitle IconEl={IconTextCaption} title="Deskripsi pengguna">
					<Text
						fontStyle={data.description ? 'normal' : 'italic'}
						color={data.description ? 'inherit' : 'gray.500'}
						children={data.description || 'Tidak Ada Deskripsi pengguna'}
					/>
				</SectionWithTitle>

				<SectionWithTitle IconEl={IconAddressBook} title="Alamat Lengkap">
					<VerticalTable
						data={{
							Alamat: data.address,
							Kelurahan: data.village,
							Kecamatan: data.subDistrict,
							Kabupaten: data.city,
							Provinsi: data.province,
						}}
					/>
				</SectionWithTitle>

				{(isMe || roleIs('admin')) && (
					<SectionWithTitle
						IconEl={IconLock}
						title="Autentikasi"
						flexDir="row"
						justify="space-between"
					>
						{isMe && (
							<EditPasswordButton colorScheme="yellow" data={data.user}>
								Ganti Kata Sandi
							</EditPasswordButton>
						)}
						<DeleteResourceButton
							resource={isMe ? 'Akun' : 'Pengguna'}
							name={data.name}
							colorScheme="red"
							deleteApiUrl={'/users/' + data.id}
							redirectPath="/users"
						/>
					</SectionWithTitle>
				)}
			</Container>
		</Box>
	);
}
