import { Code } from '@chakra-ui/react';

export default function ConsoleLog({ data }: { data: any }) {
	return (
		<Code>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</Code>
	);
}
