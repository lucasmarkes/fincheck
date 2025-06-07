import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function AccountsSliderNavigation() {
	const swiper = useSwiper();
	return (
		<div>
			<button
				type="button"
				className="py-3 pl-2.5 pr-3.5 cursor-pointer rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
				onClick={() => swiper.slidePrev()}
			>
				<ChevronLeftIcon className="text-white w-6 h-6" />
			</button>
			<button
				type="button"
				className="py-3 pl-2.5 pr-3.5 cursor-pointer rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
				onClick={() => swiper.slideNext()}
			>
				<ChevronRightIcon className="text-white w-6 h-6" />
			</button>
		</div>
	);
}
