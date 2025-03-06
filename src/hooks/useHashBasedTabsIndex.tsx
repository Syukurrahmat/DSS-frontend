import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useHashBasedTabsIndex = (hashTabs: string[]) => {
	const location = useLocation();
	const navigate = useNavigate();

	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		const index = hashTabs.indexOf(location.hash.slice(1));
		setTabIndex(index == -1 ? 0 : index);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleTabsChange = (i: number) => {
		navigate('#' + hashTabs[i]);
		setTabIndex(i);
	};

	return [tabIndex, handleTabsChange] as const;
};

export const usePathnameBasedTabsIndex = (
	hashTabs: string[],
	opt: { navigationPrefix: string },
) => {
	const location = useLocation();
	const navigate = useNavigate();
	const navigationPrefix = opt?.navigationPrefix || '#';
	const [tabIndex, setTabIndex] = useState(-1);

	useEffect(() => {
		const currentTab = location.pathname.split('/').at(-1);
		const index = currentTab ? hashTabs.indexOf(currentTab) : -1;
		setTabIndex(index == -1 ? 0 : index);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleTabsChange = (i: number) => {
		navigate(navigationPrefix + hashTabs[i]);
		setTabIndex(i);
	};

	return [tabIndex, handleTabsChange] as const;
};
