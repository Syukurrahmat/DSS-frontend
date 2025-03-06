import { CompanyType, NodeStatus , UserRole} from '@/constants/data';

type Coordinate = { latitude: number; longitude: number };

type DTNodes = {
	id: number;
	companyId: number | null;
	nodeTypeId: number;
	name: string;
	address: string;
	status: NodeStatus;
	lastDataSent?: string;
	createdAt: string;
	coordinate: Coordinate;
	isUptodate: boolean;
	owner?: {
		name: string;
		id: number;
		type: CompanyType;
	};
	nodeType: {
		id: number;
		name: string;
	};
};

type DTSensor = {
	id: number;
	name: string;
	image?: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	parameterCount: number;
};

type DTParameter = {
	id: number;
	name: string;
	unit: string;
	isCalculable: boolean;
	description: string;
	createdAt: string;
	updatedAt: string;
};
// =========================

type DTEventLog = {
	eventLogId: number;
	companyId: number;
	name: string;
	type: string;
	startDate: string;
	status: string;
	endDate: string;
	duration: number;
};
