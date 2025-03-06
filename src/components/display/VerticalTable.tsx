import { Box, Table, TableContainer, Tbody, Td, Th, Tr } from '@chakra-ui/react';

export default function VerticalTable({ data }: { data: Record<string, string | number> }) {
	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden">
			<TableContainer>
				<Table>
					<Tbody>
						{Object.entries(data).map(([key, value]) => (
							<Tr key={key}>
								<Th fontSize="sm" bgColor="gray.50">
									{key}
								</Th>
								<Td>{value}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
}
