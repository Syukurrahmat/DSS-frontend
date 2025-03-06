export const CompanyTypes = [
	'tofufactory',
	'service',
	'agriculture',
	'retailstore',
	'restaurant',
	'other',
] as const;
export type CompanyType = (typeof CompanyTypes)[number];

export const EVENTLOG_TYPE = [
	'production',
	'maintenance',
	'training',
	'administrative',
	'repair',
	'other',
] as const;
export type EventLogsType = (typeof EVENTLOG_TYPE)[number];

export const EventLogStatuses = [
	'inProgress',
	'completed',
	'upcoming',
] as const;
export type EventLogsStatus = (typeof EventLogStatuses)[number];

export const NodeStatuses = [
	'active',
	'inactive',
	'idle',
	'neversentdata',
] as const;

export type NodeStatus = (typeof NodeStatuses)[number];

export const UserRoles = ['admin', 'gov', 'manager', 'regular'] as const;
export type UserRole = (typeof UserRoles)[number];



export const NodeTypes = ['private', 'public'] as const 
export type NodeType = (typeof NodeTypes)[number];


export const UNIT_CH4 = 'PPM';
export const UNIT_CO2 = 'PPM';
export const UNIT_PM = 'µg/m³';

export const MAX_CH4 = 1200;
export const MAX_CO2 = 1000;

export const TRESHOLD_CH4 = [1000, 200].map((e) => e / MAX_CH4);
export const TRESHOLD_CO2 = [350, 700 - 350, MAX_CO2 - 700].map(
	(e) => e / MAX_CO2,
);

export const GAUGE_CHART_COLORS = ['#5BE12C', '#F5CD19', '#EA4228'];
