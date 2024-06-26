"use client";

import { Icon } from "@iconify/react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/form/textField";

type DialogProps = {
	open: boolean;
	onClose(): void;
};

export function Dialog() {
	const _form = useForm();
	return (
		<div className="flex items-center justify-center">
			<FormProvider
				{..._form}
				// onSubmit={_form.handleSubmit((v) => {
				// console.log(v);
				// })}
			>
				<form
					onSubmit={_form.handleSubmit((v) => {
						console.log({ v });
					})}
				>
					<div className="flex min-h-screen w-screen flex-1 items-center justify-center bg-black bg-opacity-20">
						<div className="rounded bg-zinc-710 p-8">
							<div className="mb-4 flex items-center font-medium text-slate-300 hover:underline">
								<Icon icon="ph:caret-left-bold" className="mr-1" />
								<span>Voltar</span>
							</div>
							<div className="flex flex-col">
								<div className="flex justify-center font-bold text-2xl text-zinc-300">
									Boas vindas de volta!
								</div>
								<div className="flex justify-center text-zinc-400 leading-5">
									Estamos muito animados em te ver novamente!
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<Input
									autoComplete="off"
									name="email"
									label="E-mail"
									required
								/>
								<Input
									autoComplete="off"
									className="dark"
									type="password"
									required
									label="Senha"
									name="password"
								/>

								<Button className="w-full dark:text-zinc-200" type="submit">
									Entrar
								</Button>
							</div>
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}
