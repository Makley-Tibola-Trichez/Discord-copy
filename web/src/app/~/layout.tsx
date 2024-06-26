import GreetingAvatarIcon from "~/assets/svgs/greeting-avatar.svg";
import MessageIcon from "~/assets/svgs/message.svg";

import { Button } from "~/@/components/ui/button";
import { SideBarChannel } from "~/@/side-bar/side-bar-channel";
import { Divider } from "~/components/divider";

export default function PrivateLayout({ children }: React.PropsWithChildren) {
	return (
		<>
			<div className="flex h-screen w-full ">
				<div className="flex gap-1 bg-d-neutral-900 text-white">
					<div className="flex h-full flex-col gap-2 py-3 pr-3">
						<SideBarChannel
							title="Mensagens diretas"
							iconName={"ic:baseline-discord"}
							href="/~/dm"
						/>
						<div className="group flex items-center justify-center gap-2 pl-3">
							<Divider className="w-8" />
						</div>
						<div>teste</div>
						<div>teste</div>
						<div>teste</div>
					</div>
				</div>
				<div className="w-[240px] bg-d-neutral-750 text-d-neutral-100-experimental">
					<div className="overflow-hidden p-2.5 shadow-[0px_1px_2px_0px_#1E1F22]">
						<button
							type="button"
							className="flex h-7 w-full items-center whitespace-nowrap rounded-[4px] bg-d-neutral-900 p-1.5 text-xs "
						>
							Encontre ou comece uma conver...
						</button>
					</div>

					<div className="p-2">
						<Button
							variant={"no-style"}
							className="flex h-[42px] w-full items-center justify-start rounded-[4px] px-3 hover:bg-d-neutral-600/55 hover:text-white"
						>
							<div className="flex items-center gap-4">
								<GreetingAvatarIcon />
								<span>Amigos</span>
							</div>
						</Button>
						<Button
							variant={"no-style"}
							className="flex w-full justify-start hover:bg-d-neutral-600/55 hover:text-white"
						>
							<div className="flex gap-4 ">
								<MessageIcon />
								<span>Solicitações de mensagens</span>
							</div>
						</Button>
						<span className="p-1 pt-2 pl-4 font-bold text-xs">
							Mensagens diretas
						</span>
					</div>
				</div>
				{children}
			</div>
		</>
	);
}
