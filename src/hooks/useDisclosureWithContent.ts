import { useState } from 'react';

export type ReturnTypeUseDisclosureWithContent<T> = {
	content: T;
	setContent: React.Dispatch<React.SetStateAction<T | null>>;
	isOpen: boolean;
	onOpen: (value: T) => void;
	onClose: () => void;
	onCloseComplete: () => void;
};

export function useDisclosureWithContent<T = any>(): ReturnTypeUseDisclosureWithContent<T> {
	const [content, setContent] = useState<T | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	return {
		content: content as T,
		setContent,
		isOpen: isOpen === false ? false : content !== null,
		onOpen: (value: T) => {
			setContent(value);
			setIsOpen(true)
		},
		onClose: () => setIsOpen(false),
		onCloseComplete: () => setContent(null),
	};
}
