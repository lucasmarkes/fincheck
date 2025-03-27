import { Spinner } from "./Spinner";

export function Loader() {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-gray-50 flex justify-center items-center">
			<Spinner />
		</div>
	);
}
