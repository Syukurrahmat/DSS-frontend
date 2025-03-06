type DTNodeType = {
	id: number;
	name: string;
	image?: string;
	description: string;
	sensorCount: number;
	parameterCount: number;
	createdAt: string;
	updatedAt: string;
};

type DetailNodeType = {
	id: number;
	name: string;
	image?: string;
	description: string;
	sensors: {
		id: number;
		name: string;
		image: any;
		supportedMeasurements: {
			id: number;
			name: string;
			unit: string;
		}[];
	}[];
	createdAt: string;
	updatedAt: string;
};
