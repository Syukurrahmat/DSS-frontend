import { UserRole } from '@/constants/data';
import { createContext } from 'react';
import { KeyedMutator } from 'swr';

export type CheckRole = (role: UserRole | UserRole[]) => boolean;
export type ScreenType = 'mobile' | 'tablet' | 'desktop';

type UserContext = {
	user: CurrentUser;
	mutateUser: KeyedMutator<CurrentUser>;
	roleIs: CheckRole;
	roleIsNot: CheckRole;
	screenType: ScreenType;
};

export type CurrentUser = {
	id: number;
	profileId: number;
	name: string;
	role: UserRole;
	profilePicture: string | undefined;
	email: string;
};

export const UserContext = createContext<UserContext>(null as any);
