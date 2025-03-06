import { Icon, IconBook2, IconBuildingCottage, IconBuildingFactory2, IconBuildingStore, IconBuildingTunnel, IconChecks, IconCircleDot, IconClipboardText, IconHeartHandshake, IconLock, IconNote, IconPaint, IconProgress, IconProps, IconRocket, IconToggleLeft, IconToggleRight, IconTool, IconToolsKitchen2, IconTrees, IconUser, IconUserBolt, IconUserCancel, IconUserCog, IconUserShield, IconWindow, IconWorld, IconZzz } from '@tabler/icons-react'; //prettier-ignore
import {
	CompanyType,
	EventLogsStatus,
	EventLogsType,
	NodeStatus,
	UserRole,
} from './data';

type Attribute = {
	icon: React.ForwardRefExoticComponent<
		Omit<IconProps, 'ref'> & React.RefAttributes<Icon>
	>;
	color: string;
	name: string;
	note?: string;
};

type AttributesObject<T extends string> = Record<T, Attribute>;

export const eventLogsTypeAttr: AttributesObject<EventLogsType> = {
	production: {
		icon: IconBuildingFactory2,
		color: 'green',
		name: 'Produksi',
	},
	maintenance: {
		icon: IconPaint,
		color: 'blue',
		name: 'Pemeliharaan',
	},
	training: {
		icon: IconBook2,
		color: 'orange',
		name: 'Pelatihan',
	},
	administrative: {
		icon: IconClipboardText,
		color: 'purple',
		name: 'Administratif',
	},
	repair: {
		icon: IconTool,
		color: 'red',
		name: 'Perbaikan',
	},
	other: {
		icon: IconNote,
		color: 'gray',
		name: 'Lainnya',
	},
};

export const companyTypeAttr: AttributesObject<CompanyType | 'regular'> = {
	tofufactory: {
		icon: IconBuildingFactory2,
		color: 'blue',
		name: 'Pabrik tahu',
	},
	service: {
		icon: IconHeartHandshake,
		color: 'purple',
		name: 'Layanan',
	},
	agriculture: {
		icon: IconBuildingCottage,
		color: 'teal',
		name: 'Pertanian',
	},
	retailstore: {
		icon: IconBuildingStore,
		color: 'orange',
		name: 'Retail',
	},
	restaurant: {
		icon: IconToolsKitchen2,
		color: 'yellow',
		name: 'Restoran',
	},
	other: {
		icon: IconBuildingTunnel,
		color: 'gray',
		name: 'Lainnya',
	},
	regular: {
		icon: IconCircleDot,
		color: 'green',
		name: 'Node yang Anda Ikuti',
	},
};

export const nodeEnvironmentAttr: AttributesObject<'indoor' | 'outdoor'> = {
	indoor: { icon: IconWindow, color: 'yellow', name: 'Indoor' },
	outdoor: { icon: IconTrees, color: 'green', name: 'Outdoor' },
};

export const nodeTypeAttr: AttributesObject<'private' | 'public'> = {
	private: {
		icon: IconLock,
		color: 'orange',
		name: 'Private',
		note: 'Node hanya dapat diikuti oleh pemiliknya',
	},
	public: {
		icon: IconWorld,
		color: 'blue',
		name: 'Publik',
		note: 'Node dapat diikuti semua pengguna',
	},
};

export const nodeStatusAttr: AttributesObject<NodeStatus> = {
	active: {
		icon: IconToggleRight,
		color: 'green',
		name: 'Aktif',
		note: 'Node berjalan dengan baik',
	},
	inactive: {
		icon: IconToggleLeft,
		color: 'red',
		name: 'Nonaktif',
		note: 'Node tidak menerima data',
	},
	idle: {
		icon: IconZzz,
		color: 'orange',
		name: 'Diam',
		note: 'Lebih dari 6 jam node tidak menerima data',
	},
	neversentdata: {
		icon: IconZzz,
		color: 'orange',
		name: 'Menunggu',
		note: 'Belum pernah mengirimkan data',
	},
};

export const userRoleAttr: AttributesObject<UserRole | 'unverified'> = {
	regular: { icon: IconUser, color: 'green', name: 'Masyarakat Umum' },
	manager: { icon: IconUserBolt, color: 'blue', name: 'Pemilik Usaha' },
	admin: { icon: IconUserCog, color: 'orange', name: 'Administrator' },
	gov: { icon: IconUserShield, color: 'yellow', name: 'Pemerintah' },
	unverified: {
		icon: IconUserCancel,
		color: 'gray',
		name: 'Belum diverifikasi',
	},
};

export const eventLogStatusAttr: AttributesObject<EventLogsStatus> = {
	inProgress: { icon: IconRocket, color: 'green', name: 'Berlangsung' },
	completed: { icon: IconChecks, color: 'blue', name: 'Selesai' },
	upcoming: { icon: IconProgress, color: 'orange', name: 'Belum Dimulai' },
};

export const roleTagColor: Record<UserRole, string> = {
	regular: 'green',
	manager: 'blue',
	admin: 'orange',
	gov: 'gray',
};

export const nodeLocationTagColor: Record<'indoor' | 'outdoor', string> = {
	indoor: 'green',
	outdoor: 'blue',
};
