import logo from '@/assets/logo/logo.svg';
import { useUser } from '@/context/user/useUser';
import { NavbarRoute } from '@/routers/routerList';
import { Box, Button, Divider, HStack, IconButton, Image, Portal, Spacer, VStack } from '@chakra-ui/react'; // prettier-ignore
import { IconX } from '@tabler/icons-react'; // prettier-ignore
import { useMemo, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface SidebarProps {
	navbarList: NavbarRoute[];
	sidebarIsColapseState: ReturnUseState<boolean>;
}

export default function Sidebar({
	navbarList,
	sidebarIsColapseState,
}: SidebarProps) {
	const { screenType } = useUser();
	const [sidebarIsCollapse, setSidebarIsColapse] = sidebarIsColapseState;
	const ref = useRef<any>();

	const [topNavlist, bottomNavlist] = useMemo(() => {
		const bottomNavPath = ['/about', '/account'];
		const topNavlist: NavbarRoute[] = [];
		const bottomNavlist: NavbarRoute[] = [];

		navbarList.map((e) =>
			bottomNavPath.includes(e.path)
				? bottomNavlist.push(e)
				: topNavlist.push(e),
		);
		return [topNavlist, bottomNavlist];
	}, [navbarList]);

	const MyNavLink = ({ data }: { data: any }) => (
		<NavLink to={data.path}>
			{({ isActive }) => (
				<Button
					w="full"
					p="2"
					overflow="hidden"
					color={isActive ? 'inherit' : 'gray.600'}
					isActive={isActive}
					fontWeight="600"
					leftIcon={<data.Icon />}
					justifyContent="left"
					children={data.label}
					onClick={() => {
						if (screenType === 'mobile') setSidebarIsColapse(true);
					}}
				/>
			)}
		</NavLink>
	);

	return (
		<VStack
			className="sidebar"
			transform={!sidebarIsCollapse ? 'translateX(0px)' : undefined}
			py="4"
			align="stretch"
			bg="gray.100"
			ref={ref}
		>
			<HStack justify="space-between" mb="4" px="4" maxH="52px">
				<Link to="/">
					<Image h="40px" pl="2" src={logo} />
				</Link>
				<IconButton
					className="is-mobile"
					colorScheme="gray"
					icon={<IconX />}
					variant="ghost"
					color="gray.600"
					aria-label="Tutup Menu"
					onClick={() => {
						setSidebarIsColapse(true);
					}}
				/>
			</HStack>

			<VStack
				px="4"
				overflowY="auto"
				scrollMarginX="10px"
				className="custom-scrollbar"
				as="nav"
				align="stretch"
				flexGrow="1"
			>
				{topNavlist.map((e, i) => (
					<MyNavLink data={e} key={i} />
				))}
				<Spacer />
				<Divider borderColor="gray.300" />
				{bottomNavlist.map((e, i) => (
					<MyNavLink data={e} key={i} />
				))}
			</VStack>

			{screenType == 'mobile' && !sidebarIsCollapse && (
				<Portal>
					<Box
						onClick={() => setSidebarIsColapse(true)}
						sx={{
							position: 'fixed',
							left: '0px',
							top: '0px',
							width: '100vw',
							height: '100vh',
							background: 'var(--chakra-colors-blackAlpha-600)',
							zIndex: 'var(--chakra-zIndices-modal)',
						}}
					></Box>
				</Portal>
			)}
		</VStack>
	);
}
