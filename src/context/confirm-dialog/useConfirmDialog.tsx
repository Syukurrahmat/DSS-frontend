import { useContext } from 'react';
import { ConfirmDialogContext } from './context';

export const useConfirmDialog = () => useContext(ConfirmDialogContext);
