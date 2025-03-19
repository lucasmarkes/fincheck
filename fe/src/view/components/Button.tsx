import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
	type?: "submit" | "button" | "reset";
	label: string;
}

export function Button({ type, label, className, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			type={type}
			className={cn(
				"bg-teal-800 hover:bg-teal-900 disabled:bg-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium text-white transition-all hover:cursor-pointer",
				className,
			)}
		>
			{label}
		</button>
	);
}
