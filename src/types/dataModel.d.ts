import { CompanyType, NodeStatus, NodeType, UserRole } from '@/constants/data';

type UsersOverview = {
	totalUsers: number;
	roles: { role: UserRole; count: number }[];
	verifiedUsers: number;
	unverifiedUsers: number;
};

type CompaniesOverview = {
	totalCompany: number;
	types: { type: CompanyType; count: number }[];
};

type NodesOverview = {
	totalNodes: number;
	ownship: { ownship: NodeType; count: number }[];
	status: { status: NodeStatus; count: number }[];
};

type CompanyItem = {
	id: number;
	managedBy: number;
	name: string;
	coordinate: number[];
	address: string;
	type: CompanyType;
	createdAt: string;
	indoorNodeValue?: {
		name: string;
		data: {
			name: string;
			datetime: string;
			value: number;
		};
	}[];
	indoorNodes?: {
		isUptodate: boolean;
		nodeId: number;
		companyId: number;
		name: string;
		status: NodeStatus;
		lastDataSent: string;
		createdAt: string;
	}[];
	manager: {
		userId: number;
		name: string;
	};
};

type NodeItem = {
	id: number;
	companyId: number | null;
	name: string;
	address: string;
	ownerId: number | undefined;
	coordinate: number[];
	isUptodate: boolean;
	lastDataSent: string | undefined;
	createdAt: string;
	isCompanyLocation?: boolean;
	isSubscribed?: boolean;
	owner?: {
		name: string;
		companyId: number;
		type: string;
	};
};

type searchGroupWithSubsResult = {
	nodeId: number;
	name: string;
	subscription?: string;
};

type DetailEventLog = {
	eventLogId: number;
	companyId: number;
	name: string;
	status: string;
	type: string;
	startDate: string;
	duration: number;
	endDate: string;
	description: string;
	location: string;
};

type CurrentEventLogs = {
	complete: {
		count: number;
		events: DTEventLog[];
	};
	inProgress: {
		count: number;
		events: DTEventLog[];
	};
	upcoming: {
		count: number;
		events: DTEventLog[];
	};
};

// type DataPageData = {
// 	success: boolean;
// 	startDate: string;
// 	endDate: string;
// 	result: {
// 		nodeId: number;
// 		name: string;
// 		status: string;
// 		lastDataSent: string;
// 		dataLogs: DTDatalog[];
// 	};
// }

type DownloadDataResponse = {
	startDate: string;
	endDate: string;
	result: any;
};
