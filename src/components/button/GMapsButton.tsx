import { Coordinate } from '@/types/data-table';
import { Button, ButtonProps, Link } from '@chakra-ui/react';
import { IconBrandGoogleMaps } from '@tabler/icons-react';

interface IGMapsButton extends ButtonProps {
	coordinate: Coordinate
}
export default function GMapsButton({ coordinate, ...rest }: IGMapsButton) {
	return (
		<Link
			href={`https://www.google.com/maps?q=${coordinate.latitude},${coordinate.longitude}`}
			target={'_blank'}
		>
			<Button
				size="sm"
				colorScheme="blue"
				variant="outline"
				iconSpacing="0.5"
				leftIcon={<IconBrandGoogleMaps size="16" />}
				{...rest}
			>
				{rest.children || "Buka di Maps"}
			</Button>
		</Link>
	);
}
