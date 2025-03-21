import { forwardRef, type ComponentProps } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";
interface InputProps extends ComponentProps<"input"> {
	name: string;
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ placeholder, name, id, error, className, ...props }, ref) => {
		const inputID = id || name;

		return (
			<div className="relative">
				<input
					{...props}
					ref={ref}
					name={name}
					id={inputID}
					className={cn(
						"bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none",
						error && "!border-red-900",
						className,
					)}
					placeholder=" "
				/>
				<label
					htmlFor={inputID}
					className="absolute text-xs top-2 left-[13px] pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
				>
					{placeholder}
				</label>

				{error && (
					<div className="flex items-center gap-2 mt-2 text-red-900">
						<CrossCircledIcon className="w-4 h-4" />
						<span className="text-xs">{error}</span>
					</div>
				)}
			</div>
		);
	},
);
