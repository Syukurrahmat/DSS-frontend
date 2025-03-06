import { CompanyType, UserRole } from '@/constants/data';
import { Coordinate } from '../data-table';

type DTCitizens = {
	id: number;
	name: string;
	profilePicture?: string;
	phone: string;
	province: string;
	city: string;
	subDistrict: string;
	village: string;
	address: string;
	createdAt: string;
	updatedAt: string;
};

type DetailCitizens = {
	id: number;
	name: string;
	phone: string;
	description?: string;
	nik: string;
	province: string;
	city: string;
	subDistrict: string;
	village: string;
	address: string;
	createdAt: string;
	updatedAt: string;
	user: UserInfo;
};

type DTCompanies = {
	id: number;
	coordinate: Coordinate;
	name: string;
	address: string;
	type: CompanyType;
	createdAt: string;
	email: string;
};
type DetailCompany = {
	coordinate: Coordinate;
	id: number;
	name: string;
	description: string;
	address: string;
	type: CompanyType;
	permitNumber: string;
	phone: string;
	photos: string[];
	createdAt: string;
	updatedAt: string;
	user: UserInfo;
};
type DTAdmin = {
	id: number;
	name: string;
	institution: string;
	createdAt: string;
};

type DetailAdmin = {
	id: number;
	name: string;
	description?: string;
	institution: string;
	createdAt: string;
	updatedAt: string;
	user: UserInfo;
};

type DTGoverment = {
	id: number;
	name: string;
	institution: string;
	position: string;
	institution: string;
	institutionLevel: string;
	createdAt: string;
};

type DetailGoverment={
	id: number
    name: string
    phone: string
	description?: string;
    nip: string
    position: string
    institution: string
    institutionLevel: string
    createdAt: string
    updatedAt: string
	user: UserInfo;
}

type UserInfo = {
	id: number;
	role: UserRole;
	email: string;
	profilePicture: any;
	isVerified: boolean;
	timezone: string;
	createdAt: string;
	updatedAt: string;
};
