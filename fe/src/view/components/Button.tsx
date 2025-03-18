import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
	type?: "submit" | "button" | "reset";
	label: string;
}

export function Button({ type, label, ...props }: ButtonProps) {
	return (
		<button
			type={type}
			{...props}
			className="bg-teal-900 hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium text-white transition-all"
		>
			{label}
		</button>
	);
}
