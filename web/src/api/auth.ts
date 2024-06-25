import type { FetchHttpClientAdapter } from "../adapters/fetch-adapter";

export class Auth {
	constructor(private readonly httpClient: FetchHttpClientAdapter) {}

	login(body: { email: string; password: string }) {
		return this.httpClient.post<{ token: string }>("/api/auth/login", body);
	}

	register(body: {
		email: string;
		name: string;
		username: string;
		password: string;
	}) {
		return this.httpClient.post("/api/auth/register", body);
	}
}
