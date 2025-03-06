/* eslint-disable react-refresh/only-export-components */

import { UserRole } from '@/constants/data';
import { useUser } from '@/context/user/useUser';
import AppShell from '@/pages/app/_layout/AppShell';
import NotFoundPage from '@/pages/not-found';
import { TablerIcon } from '@/types/type';
import { IconCircleDot, IconDashboard, IconDatabase, IconFileReport, IconInfoSquareRounded, IconNotebook, IconRouter, IconSpeakerphone, IconUser } from '@tabler/icons-react'; // prettier-ignore
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

/* prettier-ignore-start */

// ========== FEATURES ==========
const Dashboard = lazy(() => import('@/pages/app/(core)/dashboards'));
const Summary = lazy(() => import('@/pages/app/(company)/summary'));
const Data = lazy(() => import('@/pages/app/(core)/download'));
const About = lazy(() => import('@/pages/app/(core)/about'));
const Complaints = lazy(() => import('@/pages/app/(core)/complaints'));
const Notes = lazy(() => import('@/pages/app/(company)/eventLogs'));

// ========== MANAJEMEN NODE ==========
const NodeManagement = lazy(() => import('@/pages/app/nodes'));
const CreateNode = lazy(() => import('@/pages/app/nodes/create'));
const DetailNode = lazy(() => import('@/pages/app/nodes/detail-node'));

// ========== MANAJEMEN PENGGUNA ==========
const UserManagement = lazy(() => import('@/pages/app/users'));

const CitizensManagement = lazy(() => import('@/pages/app/users/citizens'));
const CreateCitizen = lazy(() => import('@/pages/app/users/citizens/create'));
const DetailCitizen = lazy(() => import('@/pages/app/users/citizens/detail'));

const CompaniesManagement = lazy(() => import('@/pages/app/users/companies'));
const CreateCompany = lazy(() => import('@/pages/app/users/companies/create'));
const DetailCompany = lazy(() => import('@/pages/app/users/companies/detail'));

const AdminsManagement = lazy(() => import('@/pages/app/users/admins'));
const CreateAdmins = lazy(() => import('@/pages/app/users/admins/create'));
const DetailAdmins = lazy(() => import('@/pages/app/users/admins/detail'));

const GovermentResource = lazy(() => import('@/pages/app/users/goverment'));
const CreateGoverment = lazy(() => import('@/pages/app/users/goverment/create'));
const DetailGoverment = lazy(() => import('@/pages/app/users/goverment/detail'));


// ========== MANAJEMEN PERANGKAT ==========
const DevicesManagement = lazy(() => import('@/pages/app/devices'));
const NodeTypeSection = lazy(() => import('@/pages/app/devices/nodetypes'));
const SensorsSection = lazy(() => import('@/pages/app/devices/sensors'));
const ParametersSection = lazy(() => import('@/pages/app/devices/paramters'));

// ========== FEATURES ==========

/* prettier-ignore-end */

export type RouterWithRole = RouteObject & {
	role: (UserRole | 'all')[];
	label?: string;
	Icon?: TablerIcon;
};

export type NavbarRoute = Required<RouterWithRole>;

const routersList: RouterWithRole[] = [
	{
		path: '/account',
		label: 'Akun',
		Icon: IconUser,
		element: <DetailCitizen />,
		role: ['all'],
	},

	{
		path: '/about',
		label: 'Tentang',
		Icon: IconInfoSquareRounded,
		element: <About />,
		role: ['all'],
	},

	// ================== REGULAR ==================

	{
		path: '/',
		label: 'Dasbor',
		Icon: IconDashboard,
		element: <Dashboard />,
		role: ['all'],
	},
	{
		path: '/complaint',
		label: 'Aduan',
		Icon: IconSpeakerphone,
		element: <Complaints />,
		role: ['all'],
	},

	// ================== MANAGER ==================

	{
		path: '/eventlogs',
		label: 'Pencatatan',
		Icon: IconNotebook,
		element: <Notes />,
		role: ['manager'],
	},
	{
		path: '/summary',
		label: 'Laporan',
		Icon: IconFileReport,
		element: <Summary />,
		role: ['manager'],
	},

	// ================== ADMIN ==================
	{
		path: '/users',
		label: 'Kelola Pengguna',
		Icon: IconUser,
		role: ['admin', 'gov'],
		children: [
			{
				element: <UserManagement />,
				children: [
					{ index: true, element: <CitizensManagement /> },
					{ path: 'citizens', element: <CitizensManagement /> },
					{ path: 'companies', element: <CompaniesManagement /> },
					{ path: 'admins', element: <AdminsManagement /> },
					{ path: 'goverments', element: <GovermentResource /> },
				],
			},
			{
				path: 'citizens',
				children: [
					{ path: ':id', element: <DetailCitizen /> },
					{ path: 'create', element: <CreateCitizen /> },
				],
			},
			{
				path: 'companies',
				children: [
					{ path: ':id', element: <DetailCompany /> },
					{ path: 'create', element: <CreateCompany /> },
				],
			},
			{
				path: 'admins',
				children: [
					{ path: ':id', element: <DetailAdmins /> },
					{ path: 'create', element: <CreateAdmins /> },
				],
			},
			{
				path: 'goverments',
				children: [
					{ path: ':id', element: <DetailGoverment /> },
					{ path: 'create', element: <CreateGoverment /> },
				],
			},
		],
	},

	{
		path: '/nodes',
		label: 'Kelola Node',
		Icon: IconCircleDot,
		element: <NodeManagement />,
		role: ['admin', 'gov'],
		children: [
			{ path: 'create', element: <CreateNode /> },
			{ path: ':id', element: <DetailNode /> },
		],
	},

	{
		path: '/devices',
		element: <DevicesManagement />,
		label: 'Kelola Devices',
		Icon: IconRouter,
		role: ['admin', 'gov'],
		children: [
			{ index: true, element: <NodeTypeSection /> },
			{ path: 'nodetypes', element: <NodeTypeSection /> },
			{ path: 'sensors', element: <SensorsSection /> },
			{ path: 'paramaters', element: <ParametersSection /> },
		],
	},

	{
		path: '/data',
		label: 'Data',
		Icon: IconDatabase,
		element: <Data />,
		role: ['manager', 'admin', 'gov'],
	},
];

export const generateAppRouter = (role: UserRole) => {
	const routerList = routersList.filter((e) => e.role.includes(role) || e.role.includes('all'));

	const navlist = routerList.filter(
		(e) => (e.label && e.Icon) || e.path == '/account',
	) as NavbarRoute[];

	return createBrowserRouter([
		{
			path: '/',
			element: <AppShell navbarList={navlist} />,
			children: routerList,
			errorElement: (import.meta as any).env.PROD && <NotFoundPage />,
		},
	]);
};

export const RouterProviderRoleBase = () => {
	const { user } = useUser();
	return <RouterProvider router={generateAppRouter(user.role)} />;
};
