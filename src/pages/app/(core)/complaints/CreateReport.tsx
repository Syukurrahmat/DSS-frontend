import RequiredIndicator from '@/components/input/RequiredIndicator';
import MapView from '@/components/maps';
import StarRating from '@/components/RatingStar';
import { DEFAULT_CENTER_MAP } from '@/constants/config';
import { useUser } from '@/context/user/useUser';
import { toBase64, trimAndCleanProps } from '@/lib/common.utils';
import useMyToasts from '@/hooks/useMyToast';
import { myAxios } from '@/lib/fetcher.utils';
import { Avatar, Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, VStack, useDisclosure } from '@chakra-ui/react'; //prettier-ignore
import { useFormik } from 'formik';
import { mutate } from 'swr';
import * as Yup from 'yup';
import { PhotosPicker } from '@/components/input/PhotosPicker';
import { LatLngLiteral } from 'leaflet';

const validationSchema = Yup.object().shape({
	message: Yup.string().max(255, 'Terlalu Panjang').required('Wajib Diisi'),
	rating: Yup.number().required('Wajib Diisi'),
	coordinate: Yup.array().test(
		'',
		'Anda Belum menentukan titik koordinat',
		(e) => e && e.filter((e) => e).length == 2,
	),
});

type CreateComplaintForm = {
	message: string;
	rating: number;
	coordinate: LatLngLiteral | null;
	images: (File | null)[];
};

export default function CreateComplaint() {
	const { user } = useUser();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useMyToasts();

	const {
		handleChange,
		handleBlur,
		isSubmitting,
		values,
		setFieldValue,
		setSubmitting,
		resetForm,
		touched,
		errors,
		handleSubmit,
	} = useFormik<CreateComplaintForm>({
		initialValues: {
			message: '',
			rating: 0,
			coordinate: null,
			images: [],
		},
		validationSchema,
		onSubmit: async (values) => {
			const images = await Promise.all(
				values.images.filter((e) => e as File).map((e) => toBase64(e)),
			);

			myAxios
				.post('/reports', trimAndCleanProps({ ...values, images }))
				.then(() => {
					toast.success('Aduan berhasil dikirim');
					mutate((e) => typeof e == 'string' && e.startsWith('/reports'), null, {
						revalidate: true,
					});
				})
				.catch(() => toast.success('Ada yang salah, aduan gagal dikirim'))
				.finally(() => {
					onClose();
					setSubmitting(false);
					resetForm();
				});
		},
	});

	return (
		<>
			<HStack
				rounded="md"
				bg="white"
				w="full"
				color="gray.500"
				justifyContent="start"
				cursor="pointer"
				onClick={onOpen}
			>
				<Avatar boxSize="37px" name={user.name} src={user.profilePicture} />
				<Box
					fontWeight="400"
					border="1px solid"
					borderColor="gray.300"
					px="4"
					py="2"
					w="full"
					rounded="full"
					children="Buat Aduan"
				/>
			</HStack>
			<Modal
				size="2xl"
				isOpen={isOpen}
				onClose={onClose}
				scrollBehavior="inside"
				closeOnEsc={false}
			>
				<form onSubmit={handleSubmit}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader borderBottom="1px solid" borderColor="gray.200">
							Posting Aduan
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<VStack mx="auto" spacing="2" maxW="container.sm" mt="4">
								<FormControl isInvalid={Boolean(errors.message) && touched.message}>
									<FormLabel>
										Tuis Pesan <RequiredIndicator />
									</FormLabel>
									<Textarea
										id="message"
										name="message"
										placeholder="Tulis kuaitas udara yang anda rasakan saat ini"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<FormErrorMessage>{errors.message}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={Boolean(errors.rating) && touched.rating}>
									<FormLabel>
										Pilih Bintang <RequiredIndicator />
									</FormLabel>
									<StarRating
										rating={values.rating}
										setRating={(e) => setFieldValue('rating', e)}
										size={2}
									/>

									<FormErrorMessage>{errors.rating}</FormErrorMessage>
								</FormControl>

								<FormControl
									isInvalid={Boolean(errors.coordinate) && touched.coordinate}
								>
									<FormLabel>
										Lokasi <RequiredIndicator />
									</FormLabel>
									<FormHelperText>
										Geser peta dan paskan penanda ke titik yang dimaksud
									</FormHelperText>
									<MapView
										scrollWheelZoom={false}
										mt="3"
										nodesData={[]}
										outline={
											errors.coordinate && touched.coordinate
												? '2px solid'
												: ''
										}
										marker='node'
										outlineColor="#E53E3E"
										isEditing={{
											coordinate: values.coordinate || DEFAULT_CENTER_MAP,
											onChange: (latLng) => {
												setFieldValue('coordinate', latLng);
											},
										}}
									/>
									<FormErrorMessage>{errors.coordinate}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={Boolean(errors.images) && touched.images}>
									<FormLabel>Foto</FormLabel>
									<PhotosPicker
										values={values.images}
										onChange={(e) => setFieldValue('images', e)}
									/>

									<FormErrorMessage>{errors.images}</FormErrorMessage>
								</FormControl>
							</VStack>
						</ModalBody>
						<ModalFooter borderTop="1px solid" borderColor="gray.200">
							<Button
								onClick={() => {
									resetForm();
									onClose();
								}}
								children="Batal"
							/>
							<Button
								colorScheme="blue"
								ml={3}
								type="submit"
								isLoading={isSubmitting}
								children="Kirim"
							/>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}
