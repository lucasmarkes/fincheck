import { Logo } from "./Logo";
import { Spinner } from "./Spinner";
import { Transition } from "@headlessui/react";

export function Loader({ isLoading }: { isLoading: boolean }) {
	return (
		<Transition
			show={isLoading}
			enter="transition-opacity duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className="bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center">
				<div className="flex flex-col items-center gap-4">
					<div className="animate-pulse">
						<Logo className="h-10 text-white" />
					</div>
					<Spinner className="text-teal-900 fill-white" />
				</div>
			</div>
		</Transition>
	);
}
