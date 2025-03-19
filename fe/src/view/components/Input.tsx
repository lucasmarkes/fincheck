import { forwardRef, type ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
	name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ placeholder, name, id, ...props }, ref) => {
		const inputID = id || name;

		return (
			<div className="relative">
				<input
					{...props}
					ref={ref}
					name={name}
					id={inputID}
					className="bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-transparent w-full pt-4 peer placeholder-shown:pt-0 transition-all"
					placeholder=" "
				/>
				<label
					htmlFor={inputID}
					className="absolute text-xs top-2 left-[13px] pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
				>
					{placeholder}
				</label>
			</div>
		);
	},
);
