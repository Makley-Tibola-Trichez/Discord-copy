import { twMerge } from "tailwind-merge";

type DividerProps = {
	className?: string;
};
export const Divider = (props: DividerProps) => {
	return (
		<div
			className={twMerge(
				"flex h-[2px] rounded-[1px] w-1 items-center rounded-e-2xl bg-d-neutral-700 group-hover:h-5 hover:w-2",
				props.className,
			)}
		/>
	);
};
