import notFoundImage from '@/assets/images/not-found-image.jpg';
import { Card, CardProps, Image, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface DeviceCardBaseProps extends CardProps {
	image?: string;
	children: ReactNode;
}

export default function DeviceCardBase({ image, children, ...props }: DeviceCardBaseProps) {
	return (
		<Card
			w="100%"
			_hover={{ bg: 'gray.50' }}
			_active={{ bg: 'white' }}
			userSelect="none"
			cursor="pointer"
			flexDir="row"
			rounded="lg"
			p="2"
			gap="1"
			{...props}
		>
			<Image w="100px" rounded="md" fit="cover" h="100px" src={image || notFoundImage} />
			<Stack gap="0" p="2">
				{children}
			</Stack>
		</Card>
	);
}
