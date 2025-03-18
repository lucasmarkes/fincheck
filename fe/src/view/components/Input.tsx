import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
	name: string;
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
	const inputID = id || name;

	return (
		<div className="relative">
			<input
				{...props}
				name={name}
				id={inputID}
				className="bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-transparent w-full pt-4 peer placeholder-shown:pt-0 transition-all"
				placeholder=" "
			/>
			<label
				htmlFor={inputID}
				// className="absolute top-3.5 left-[13px]  pointer-events-none text-gray-700"
				className="absolute text-xs top-2 left-[13px] pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
			>
				{placeholder}
			</label>
		</div>
	);
}
8;
