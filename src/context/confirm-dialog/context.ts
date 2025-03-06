import { createContext, ReactNode } from "react";

export type ConfirmMessage = {
	title: string;
	message: ReactNode;
	onConfirm: () => Promise<void> | void | null;
	confirmButtonColor?: string;
	confirmText?: string;
	withoutCancelButton?: boolean;
} | null;

export type ConfirmDialogContext = (value: ConfirmMessage) => void;

export const ConfirmDialogContext = createContext<ConfirmDialogContext>(
	() => {},
);
