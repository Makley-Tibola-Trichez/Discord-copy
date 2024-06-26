import * as React from "react";

import { cn } from "../../../@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const id = React.useId();

		return (
			<>
				<label htmlFor={id} className="dark:text-slate-300">
					{props.label}
				</label>
				<input
					type={type}
					id={id}
					className={cn(
						"flex h-10 w-full rounded-[3px] border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white disabled:cursor-not-allowed dark:border-slate-800 file:border-0 dark:bg-stone-900 file:bg-transparent file:font-medium dark:placeholder:text-slate-400 dark:text-slate-200 file:text-sm placeholder:text-slate-500 disabled:opacity-50 focus-visible:outline-none dark:focus-visible:ring-slate-300 focus-visible:ring-2 focus-visible:ring-slate-950 dark:ring-offset-slate-950 focus-visible:ring-offset-2",
						className,
					)}
					ref={ref}
					{...props}
				/>
			</>
		);
	},
);
Input.displayName = "Input";

export { Input };
