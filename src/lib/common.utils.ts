import {
	IconMoodAnnoyed,
	IconMoodCheck,
	IconMoodNervous,
	IconMoodSmile,
	IconMoodWrrr,
} from '@tabler/icons-react';

export const compareObjects = <T extends Record<string, any>>(
	obj1: T,
	obj2: T,
) => {
	const uniqueValues = {} as Partial<T>;

	Object.keys(obj1).forEach((key: keyof T) => {
		if (obj1[key] !== obj2[key]) {
			uniqueValues[key] = obj1[key];
		}
	});

	Object.keys(obj2).forEach((key: keyof T) => {
		if (obj1[key] !== obj2[key]) {
			uniqueValues[key] = obj2[key];
		}
	});

	return uniqueValues as T;
};

export const trimAndCleanProps = <T extends Record<string, any>>(obj: T) => {
	for (const key in obj) {
		if (typeof obj[key] === 'string') {
			obj[key] = obj[key].trim();
			if (!obj[key]) delete obj[key];
		} else if (typeof obj[key] === 'object') {
			obj[key] = trimAndCleanProps(obj[key] as T) as any;
		}
	}
	return obj;
};

export const toBase64 = (file: File | null) =>
	new Promise((resolve, reject) => {
		if (!file) return resolve(null);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});

export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));


// -------------------------------------

export const ISPUColor: Record<string, any> = {
	Baik: 'green',
	Sedang: 'blue',
	'Tidak Sehat': 'yellow',
	'Sangat Tidak Sehat': 'red',
	Berbahaya: 'gray',
};

const ispuProperties: { [key: string]: { colorScheme: string; icon: any } } = {
	Baik: { colorScheme: 'green', icon: IconMoodCheck },
	Sedang: { colorScheme: 'blue', icon: IconMoodSmile },
	'Tidak Sehat': { colorScheme: 'yellow', icon: IconMoodAnnoyed },
	'Sangat Tidak Sehat': { colorScheme: 'red', icon: IconMoodNervous },
	Berbahaya: { colorScheme: 'gray', icon: IconMoodWrrr },
};

const CO2Properties: { [key: string]: { colorScheme: string; icon: any } } = {
	Bersih: { colorScheme: 'green', icon: IconMoodCheck },
	Tercemar: { colorScheme: 'orange', icon: IconMoodSmile },
	Bahaya: { colorScheme: 'red', icon: IconMoodAnnoyed },
};

const CH4Properties: { [key: string]: { colorScheme: string; icon: any } } = {
	Aman: { colorScheme: 'green', icon: IconMoodCheck },
	Tercemar: { colorScheme: 'red', icon: IconMoodSmile },
};

export const getAirProperties = {
	ISPU: (category: string = 'Berbahaya') => {
		const { colorScheme, icon } =
			ispuProperties[category] || ispuProperties.Berbahaya;
		return { colorScheme, icon };
	},

	CH4: (category: string = 'Tercemar') => {
		const { colorScheme } =
			CH4Properties[category] || CH4Properties.Tercemar;
		return { colorScheme };
	},
	CO2: (category: string = 'Bahaya') => {
		const { colorScheme } = CO2Properties[category] || CO2Properties.Bahaya;
		return { colorScheme };
	},
};

export const getISPUProperties = (category?: string) => {
	const { colorScheme, icon } = category
		? ispuProperties[category]
		: ispuProperties.Berbahaya || ispuProperties.Berbahaya;
	return { colorScheme, icon };
};

export const getCH4Properties = (category?: string) => {
	const { colorScheme } = category
		? CH4Properties[category]
		: CH4Properties.Tercemar || CH4Properties.Tercemar;
	return { colorScheme };
};
export const getCO2Properties = (category?: string) => {
	const { colorScheme } = category
		? CO2Properties[category]
		: CO2Properties.Bahaya || CO2Properties.Bahaya;
	return { colorScheme };
};

export const getUserRoleName = (role: UserRole) => {
	const roleMap: Record<UserRole, string> = {
		admin: 'Administrator',
		gov: 'Pemerintah',
		manager: 'Pemilik Usaha',
		regular: 'Masyarakat Umum',
	};

	return roleMap[role];
};

export const responsiveCardSize = { base: 'sm', md: 'md' };
