import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

export function Loader() {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-teal-900 flex justify-center items-center">
			<div className="flex flex-col items-center gap-4">
				<div className="animate-pulse">
					<Logo className="h-10 text-white" />
				</div>
				<Spinner className="text-teal-900 fill-white" />
			</div>
		</div>
	);
}
