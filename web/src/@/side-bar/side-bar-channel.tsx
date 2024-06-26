"use client";
import Image from "next/image";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/ui/tooltip";
import { Icon } from "@iconify/react";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type SideBarChannelProps = {
	iconName?: string;
	img?: string;
	title: string;
	href: string;
};
export function SideBarChannel(props: SideBarChannelProps) {
	const pathname = usePathname();

	const isCurrentRoute = pathname.split("/")[1] === props.href.split("/")[1];

	return (
		<TooltipProvider delayDuration={25} disableHoverableContent>
			<Tooltip>
				<TooltipTrigger>
					<Link href={props.href} className="group flex items-center gap-2">
						<div
							className={clsx(
								"flex h-0 w-1 transition-all items-center rounded-e-2xl bg-white group-hover:h-5",
								isCurrentRoute ? "h-10" : undefined,
							)}
						/>
						<div
							className={clsx(
								"flex size-12 items-center justify-center rounded-full bg-d-neutral-700 transition-all duration-150 hover:rounded-2xl hover:bg-d-burple-500",
								isCurrentRoute ? "bg-d-burple-500 rounded-2xl" : undefined,
							)}
						>
							{props.img ? (
								<Image
									src={props.img}
									alt={props.title}
									className="rounded-full w-8 h-8"
								/>
							) : null}
							{props.iconName ? (
								<Icon icon={props.iconName} className="size-8" />
							) : undefined}
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent side="right">
					<TooltipArrow />
					<span className="font-bold">{props.title}</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
