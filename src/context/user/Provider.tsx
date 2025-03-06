import PreLoadScreen from '@/pages/preload-screen';
import { useBreakpointValue } from '@chakra-ui/react';
import { PropsWithChildren, useCallback } from 'react';
import useSWR from 'swr';
import { CheckRole, CurrentUser, ScreenType, UserContext } from './context';

export default function UserContextProvider({ children }: PropsWithChildren) {
	const screenType = useBreakpointValue<ScreenType>({
		base: 'mobile',
		md: 'tablet',
		lg: 'desktop',
	});

	const { data: user, mutate: mutateUser } = useSWR<CurrentUser>(`/auth/me`);

	const roleIs: CheckRole = useCallback(
		(role) => {
			const arr = !Array.isArray(role) ? [role] : role;
			return user ? arr.includes(user.role) : false;
		},
		[user],
	);

	const roleIsNot: CheckRole = useCallback((role) => !roleIs(role), [roleIs]);

	if (!user || !screenType) return <PreLoadScreen />;

	return (
		<UserContext.Provider
			value={{
				user,
				mutateUser,
				roleIs,
				roleIsNot,
				screenType,
			}}
			children={children}
		/>
	);
}
