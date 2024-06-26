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
						<div className="group flex pl-3 justify-center items-center gap-2">
							<Divider className="w-8" />
						</div>
						<div>teste</div>
						<div>teste</div>
						<div>teste</div>
					</div>
				</div>
				{children}
			</div>
		</>
	);
}
