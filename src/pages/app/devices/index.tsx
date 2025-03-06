import OutletTablist from '@/components/display/OutletTablist';
import { IconRouter, IconTelescope, IconWind } from '@tabler/icons-react';

const tabsList = [
	{
		label: 'Tipe Node',
		key: 'nodetypes',
		icon: IconRouter,
	},
	{
		label: 'Sensor',
		key: 'sensors',
		icon: IconTelescope,
	},
	{
		label: 'Parameter Udara',
		key: 'paramaters',
		icon: IconWind,
	},
];

export default function DevicesManagement() {
	return <OutletTablist tabsList={tabsList} path="/devices/" />;
}
