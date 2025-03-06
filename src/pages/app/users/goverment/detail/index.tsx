import DeleteResourceButton from '@/components/button/DeleteReourceButton';
import HeadingWithIcon from '@/components/display/HeadingWithIcon';
import { ProfilePicture } from '@/components/display/ProfilePicture';
import { SectionWithTitle } from '@/components/display/SectionTitle';
import VerticalTable from '@/components/display/VerticalTable';
import { TagUserRole } from '@/components/TagComponents';
import { useUser } from '@/context/user/useUser';
import { DetailGoverment } from '@/types/data/users';
import { Box, Container, HStack, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { IconBuildingSkyscraper, IconEdit, IconLock, IconMail, IconTextCaption, IconUser } from '@tabler/icons-react'; //prettier-ignore
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import EditPasswordButton from '../../EditUserPass';
import EditAdminProfileButton from './EditProfile';

export default function DetailAdmins() {
	const { id } = useParams();
	const { user, roleIs } = useUser();
	const isMe = user.profileId === +id!;

	const { data, mutate } = useSWR<DetailGoverment>(`/goverments/${id}`);

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
							<IconBuildingSkyscraper size="16" />
							<Text>{data.institution}</Text>
						</HStack>
						<HStack>
							<IconMail size="16" />
							<Link href={'mailto:' + data.user.email}>{data.user.email}</Link>
						</HStack>
					</Box>
					{roleIs('admin') && (
						<EditAdminProfileButton
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
				<SectionWithTitle IconEl={IconTextCaption} title="Deskripsi pengguna" gap="4">
					<Text
						fontStyle={data.description ? 'normal' : 'italic'}
						color={data.description ? 'inherit' : 'gray.500'}
						children={data.description || 'Tidak Ada Deskripsi pengguna'}
					/>

					<VerticalTable
						data={{
							NIP: data.nip,
							Jabatan: data.position,
							Institusi: data.institution,
							'level Institusi': data.institutionLevel,
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
