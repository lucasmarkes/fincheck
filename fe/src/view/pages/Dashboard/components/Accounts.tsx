import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "../../../components/AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "../../../components/AccountsSliderNavigation";

export function Accounts() {
	return (
		<div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
			<div>
				<span className="text-white tracking[-0.5px] block">Saldo total</span>
				<div className="flex items-center gap-2">
					<strong className="text-2xl tracking-[1px] text-white">
						R$ 1000,00
					</strong>
					<button
						type="button"
						className="w-8 h-8 flex items-center justify-center cursor-pointer"
					>
						<EyeIcon open />
					</button>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-end">
				<div>
					<Swiper spaceBetween={16} slidesPerView={2.1} navigation={true}>
						<div
							className="flex items-center justify-between mb-4"
							slot="container-start"
						>
							<strong className="text-white tracking-[-1px] text-lg font-bold">
								Minhas contas
							</strong>

							<AccountsSliderNavigation />
						</div>

						<SwiperSlide>
							<AccountCard
								name="Nubank"
								color="#8A05BE"
								balance={1000.23}
								type="CASH"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<AccountCard
								name="Nubank"
								color="#8A05BE"
								balance={1000}
								type="CASH"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<AccountCard
								name="Nubank"
								color="#8A05BE"
								balance={1000}
								type="CASH"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
}
