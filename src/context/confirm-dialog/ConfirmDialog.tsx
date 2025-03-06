import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'; //prettier-ignore
import { useRef, useState } from 'react'; //prettier-ignore
import { ConfirmMessage } from './context';
 
interface MyConfirmDialog {
	messageContext: ReturnUseState<ConfirmMessage>;
}

export default function MyConfirmDialog({ messageContext }: MyConfirmDialog) {
	const cancelRef = useRef();
	const [alertMessage, setAlertMessage] = messageContext;
	const [isLoading, setIsLoading] = useState(false);

	const onClose = () => {
		setAlertMessage(null);
	};

	return (
		<AlertDialog
			isOpen={Boolean(alertMessage)}
			motionPreset="slideInBottom"
			onClose={onClose}
			leastDestructiveRef={cancelRef as any}
			closeOnEsc={!isLoading}
			closeOnOverlayClick={!isLoading}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{alertMessage?.title}
					</AlertDialogHeader>
					<AlertDialogBody>{alertMessage?.message}</AlertDialogBody>
					<AlertDialogFooter>
						{!alertMessage?.withoutCancelButton && (
							<Button
								ref={cancelRef.current}
								isDisabled={isLoading}
								onClick={onClose}
							>
								Batal
							</Button>
						)}
						<Button
							isLoading={isLoading}
							colorScheme={
								alertMessage?.confirmButtonColor || 'blue'
							}
							onClick={async () => {
								setIsLoading(true);
								await alertMessage?.onConfirm();
								setIsLoading(false);
								onClose();
							}}
							ml={3}
						>
							{alertMessage?.confirmText || 'Konfirmasi'}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}
