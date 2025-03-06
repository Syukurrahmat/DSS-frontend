declare module '*.svg' {
	export default string;
}
declare module '*.gif' {
	export default string;
}

declare module '*.png' {
	export default string;
}

declare module '*.jpg' {
	export default string;
}


type ReturnUseState<T> = [T, React.Dispatch<React.SetStateAction<T>>];
