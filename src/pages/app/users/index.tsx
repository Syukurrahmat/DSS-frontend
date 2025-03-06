import OutletTablist from '@/components/display/OutletTablist';
import { IconBuildingFactory2, IconUser, IconUserBolt, IconUserShield } from '@tabler/icons-react';

const tabsList = [
	{
		label: 'Masyarakat Umum',
		key: 'citizens',
		icon: IconUser,
	},
	{
		label: 'Perusahaan',
		key: 'companies',
		icon: IconBuildingFactory2,
	},
	{
		label: 'Pemerintah',
		key: 'goverments',
		icon: IconUserShield,
	},
	{
		label: 'Admin',
		key: 'admins',
		icon: IconUserBolt,
	},
];

export default function UserManagement() {
	return <OutletTablist tabsList={tabsList} path='/users/' />;
}
