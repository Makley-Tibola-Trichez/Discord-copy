"use server";

import { cookies } from "next/headers";
import { api } from "../../api";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
	console.log({
		formData: formData.entries(),
	});

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const response = await api.auth.login({ email, password });

	console.log(response);

	if (response.statusCode === 200) {
		cookies().set("token", `Bearer ${response.body.token}`);
	}

	redirect("/home");
}
