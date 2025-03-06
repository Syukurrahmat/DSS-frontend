import {
	Divider,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	VStack,
} from '@chakra-ui/react';

import { TagUserRole } from '@/components/TagComponents';
import { SERVER_URL } from '@/constants/config';
import { useUser } from '@/context/user/useUser';
import { NavbarRoute } from '@/routers/routerList';
import { Avatar, HStack, Heading, Spacer } from '@chakra-ui/react';
import { IconAlignJustified, IconLogout, IconUser } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
	setSidebarIsColapse: ReturnUseState<boolean>[1];
	navbarList: NavbarRoute[];
}

export default function Header(props: HeaderProps) {
	const { setSidebarIsColapse, navbarList } = props;
	const { pathname } = useLocation();
	const { user } = useUser();
	const navigate = useNavigate();

	const title = useMemo(
		() => navbarList.find((e) => e.path == '/' + pathname.split('/')[1])?.label || 'Pawana', //prettier-ignore
		[navbarList, pathname],
	);

	useEffect(() => {
		document.title = title === 'Dasbor' ? 'Pawana' : title + ' - Pawana';
	}, [title]);

	return (
		<HStack
			px="5"
			borderBottom="1px solid var(--chakra-colors-gray-200)"
			shadow="sm"
			justify="space-between"
			w="full"
			minH="55px"
			maxH="55px"
			pos="sticky"
			top="0"
			zIndex="1100"
			bg="#F9F9F9"
		>
			<HStack>
				<IconButton
					className="is-mobile"
					ml="-3.5"
					colorScheme="gray"
					icon={<IconAlignJustified />}
					variant="ghost"
					color="gray.600"
					aria-label="Menu"
					onClick={() => {
						setSidebarIsColapse((e) => !e);
					}}
				/>

				<Heading
					lineHeight="100%"
					color="gray.700"
					fontWeight="600"
					size="md"
					children={title}
				/>
			</HStack>

			<Spacer />

			<Menu>
				<MenuButton>
					<Avatar
						boxSize="34px"
						ml="2"
						name={user.name}
						src={user.profilePicture}
					/>
				</MenuButton>
				<MenuList shadow="md" minW="250px" rounded="lg">
					<VStack py="4" spacing="0">
						<Avatar
							size="xl"
							mb="2"
							name={user.name}
							src={user.profilePicture}
						/>
						<Text fontWeight="600" fontSize="lg">
							{user.name}
						</Text>
						<Text>{user.email}</Text>
						<TagUserRole value={user.role} mt="2" />
					</VStack>
					<Divider />
					<MenuItem
						onClick={() => navigate('/account')}
						py="3"
						icon={<IconUser size="20px" />}
					>
						Detail Akun saya
					</MenuItem>
					<MenuItem
						py="3"
						onClick={() => {
							axios
								.delete(SERVER_URL + '/auth/logout', {
									withCredentials: true,
								})
								.then((res) => {
									if (res.statusText == 'OK') {
										setTimeout(() => {
											window.location.href = '/login';
										});
									}
								});
						}}
						icon={<IconLogout size="20px" />}
					>
						Keluar
					</MenuItem>
				</MenuList>
			</Menu>
		</HStack>
	);
}
