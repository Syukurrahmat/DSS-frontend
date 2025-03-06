import HeadingWithIcon from '@/components/display/HeadingWithIcon';
import InputSearch from '@/components/input/inputSearch';
import { useUser } from '@/context/user/useUser';
import { TablerIcon } from '@/types/type';
import { Button, HStack, Spacer } from '@chakra-ui/react'; //prettier-ignore
import { IconPlus } from '@tabler/icons-react'; //prettier-ignore
import { ReactNode } from 'react';

interface DTHeaderProps {
	title: string;
	iconTitle: TablerIcon;
	onAddButtonPress: () => void;
	addButtonLabel : string,
	additionalButton?: ReactNode;
}

export function DTHeader({
	title,
	iconTitle: IconTitle,
	addButtonLabel,
	onAddButtonPress,
	additionalButton,
}: DTHeaderProps) {
	const { roleIs } = useUser();

	return (
		<HStack w="full" spacing="3" pb="1" align="center" wrap="wrap">
			<HeadingWithIcon Icon={<IconTitle />} text={title} />
			<Spacer flexGrow="999" />
			{additionalButton}
			<HStack wrap="wrap" spacing='3' justify="end" flexBasis="450px" flexGrow="1">
				<InputSearch
					w="225px"
					flex="1 0 "
					bg="white"
					placeholder="Cari .."
					_onSubmit={null}
				/>
				{roleIs('admin') && (
					<Button
						leftIcon={<IconPlus size="20px" />}
						colorScheme="green"
						children={addButtonLabel}
						onClick={onAddButtonPress}
					/>
				)}
			</HStack>
		</HStack>
	);
}
