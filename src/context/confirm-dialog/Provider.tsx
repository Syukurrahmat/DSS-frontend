import { ReactNode, createContext, useState } from 'react'; //prettier-ignore
import MyConfirmDialog from './ConfirmDialog';
import { ConfirmDialogContext, ConfirmMessage } from './context';


export default function ConfirmDialogProvider(props: any) {
	const [alertMessage, setAlertMessage] = useState<ConfirmMessage>(null);

	return (
		<ConfirmDialogContext.Provider value={setAlertMessage}>
			{props.children}
			<MyConfirmDialog messageContext={[alertMessage, setAlertMessage]} />
		</ConfirmDialogContext.Provider>
	);
}
