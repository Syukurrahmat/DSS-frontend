import LoadingComponent from '@/components/display/LoadingComponent';
import { useConfirmDialog } from '@/context/confirm-dialog/useConfirmDialog';
import { useUser } from '@/context/user/useUser';
import { NavbarRoute } from '@/routers/routerList';
import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	HStack,
	Icon,
	Text,
	VStack,
} from '@chakra-ui/react';
import { IconDeviceLaptop, IconDeviceMobile } from '@tabler/icons-react';
import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

interface AppShellProps {
	navbarList: NavbarRoute[];
}

export default function AppShell({ navbarList }: AppShellProps) {
	const { screenType } = useUser();
	const [sidebarIsCollapse, setSidebarIsColapse] = useState(
		screenType == 'mobile',
	);

	return (
		<Flex w="full" maxH="100vh" minH="100vh">
			<Sidebar
				sidebarIsColapseState={[sidebarIsCollapse, setSidebarIsColapse]}
				navbarList={navbarList}
			/>
			<Flex
				flexDir="column"
				shadow="md"
				maxH="100vh"
				minH="100vh"
				flexGrow="1"
				id="content"
				overflowY="scroll"
			>
				<Header
					setSidebarIsColapse={setSidebarIsColapse}
					navbarList={navbarList}
				/>
				<Container
					flexGrow="1"
					maxW="container.xl"
					py="4"
					sx={{ '> * ': { minH: '100%' } }}
				>
					<Suspense fallback={<LoadingComponent />}>
						<Outlet />
					</Suspense>
				</Container>
			</Flex>
		</Flex>
	);
}

function usePWAAlert() {
	const confirmDialog = useConfirmDialog();
	const { screenType } = useUser();

	const installPWA = async (deferredPrompt: any) => {
		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			console.log('User accepted the install prompt.');
		} else if (outcome === 'dismissed') {
			console.log('User dismissed the install prompt');
		}
		deferredPrompt = null;
	};

	const FirstEnterDialog = ({ deferredPrompt }: { deferredPrompt: any }) => (
		<VStack spacing="4">
			<HStack spacing="4">
				<Center p="2" rounded="md" bg="blue.100" color="blue.500">
					<Icon as={IconDeviceLaptop} boxSize="32px" />
				</Center>
				<Text>
					Disarankan menggunakan komputer atau laptop untuk pengalaman
					yang lebih optimal
				</Text>
			</HStack>
			<HStack spacing="4">
				<Box>
					<Text fontWeight="600">Namun tidak masalah</Text>
					<Text>
						Jika Anda menggunakan perangkat mobile, tambahkan
						aplikasi ini ke layar utama untuk akses lebih cepat
						dengan mengeklik tombol{' '}
						<Text as="span" fontWeight="600">
							Instal
						</Text>{' '}
						dibawah
					</Text>
				</Box>
			</HStack>
			<Button
				variant="outline"
				leftIcon={<IconDeviceMobile />}
				colorScheme="blue"
				onClick={() => installPWA(deferredPrompt)}
				children="Instal Aplikasi"
			/>
		</VStack>
	);

	useEffect(() => {
		const handleBeforeInstallPrompt = async (e: any) => {
			e.preventDefault();
			if (screenType !== 'mobile') return;

			confirmDialog({
				title: 'Inpoo',
				message: <FirstEnterDialog deferredPrompt={e} />,
				confirmText: 'Tutup',
				withoutCancelButton: true,
				onConfirm() {},
			});
		};

		window.addEventListener(
			'beforeinstallprompt',
			handleBeforeInstallPrompt,
		);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
			);
		};
	}, []);
}
