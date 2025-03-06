import { ChakraProvider } from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/id';
import ReactDOM from 'react-dom/client';
import ConfirmDialogProvider from './context/confirm-dialog/Provider.tsx';
import UserContextProvider from './context/user/Provider.tsx';
import { myTheme, toastOptions } from './lib/theme.ts';

import 'react-photo-view/dist/react-photo-view.css';
import './global.css';
import { RouterProviderRoleBase } from './routers/routerList.tsx';
import { SWRConfig } from 'swr';
import { fetcher } from './lib/fetcher.utils.ts';

moment.locale('id');

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ChakraProvider toastOptions={toastOptions} theme={myTheme}>
		<SWRConfig value={{ fetcher }}>
			<ConfirmDialogProvider>
				<UserContextProvider>
					<RouterProviderRoleBase />
				</UserContextProvider>
			</ConfirmDialogProvider>
		</SWRConfig>
	</ChakraProvider>,
);
