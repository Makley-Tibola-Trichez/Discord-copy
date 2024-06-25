import { Icon } from "@iconify/react";

function NotificationAndCurrentChannel() {
	return (
		<div className="flex items-center w-1 h-0 hover:w-2 rounded-e-2xl bg-white group-hover:h-5" />
	);
}

export default function HomePage() {
	return (
		<div className="w-full h-screen flex ">
			<div className="flex gap-1 bg-d-neutral-900 text-white">
				<div className="h-full py-3 pr-3 flex flex-col gap-2">
					<div className="flex items-center gap-2 group">
						<NotificationAndCurrentChannel />
						<div className="size-12 transition-all rounded-full duration-100  hover:rounded-2xl bg-red-700 flex justify-center items-center ">
							<Icon icon="ic:baseline-discord" className="size-8" />
						</div>
					</div>
					<div>teste</div>
					<div>teste</div>
					<div>teste</div>
				</div>
			</div>
			<div>teste</div>
		</div>
	);
}
