import notFoundImage from '@/assets/images/not-found-image.jpg';
import { ReturnTypeUseDisclosureWithContent } from '@/hooks/useDisclosureWithContent';
import { DTNodeType } from '@/types/data/nodetypes';
import {
	Button,
	Heading,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

export default function DetailNodeTypes(props: ReturnTypeUseDisclosureWithContent<DTNodeType>) {
	const { isOpen, content, onClose, onCloseComplete } = props;

	return (
		<Modal size="lg" isOpen={isOpen} onCloseComplete={onCloseComplete} onClose={onClose}>
			{content && (
				<>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Detail Tipe Node</ModalHeader>
						<ModalCloseButton />
						<ModalBody display="flex" gap="3" flexDir="column">
							
							<Image
								alignSelf="center"
								w="140px"
								rounded="md"
								fit="cover"
								h="140px"
								src={content.image || notFoundImage}
							/>
                            <Heading fontWeight="600" size="md">
								{content.name}
							</Heading>
                            <Heading fontWeight="600" size="md">
								{content.name}
							</Heading>

						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
							<Button variant="ghost">Secondary Action</Button>
						</ModalFooter>
					</ModalContent>
				</>
			)}
		</Modal>
	);
}
