import logo from '@/assets/logo/logo-white.svg';
import {
	Center,
	Container,
	Image,
	Progress
} from '@chakra-ui/react';

export default function PreLoadScreen() {
	return (
		<Container
			maxW="full"
			as={Center}
			flexDir="column"
			pb="70px"
			bg="#378CE7"
			minH="100vh"
		>
			<Image src={logo}  h='70px'/>

			<Progress
				mt="6"
				outline="3px solid"
				outlineColor="gray.100"
				w="300px"
				size='sm'
				isIndeterminate
				rounded="md"
			/>
		</Container>
	);
}
