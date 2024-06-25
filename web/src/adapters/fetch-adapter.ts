import { cookies } from "next/headers";
import {
	HttpClientError,
	type HttpClientMethods,
} from "../errors/http-client-error";

export type HttpClientResponse<ResponseBody> = {
	method: HttpClientMethods;
	statusCode: number;
	body: ResponseBody;
};

export interface HttpClient<HttpClientResponseBody = unknown> {
	get(
		url: string,
		searchParams: URLSearchParams,
	): Promise<HttpClientResponse<HttpClientResponseBody>>;
	post(
		url: string,
		body: Record<string, unknown>,
	): Promise<HttpClientResponse<HttpClientResponseBody>>;
	put(
		url: string,
		body: Record<string, unknown>,
	): Promise<HttpClientResponse<HttpClientResponseBody>>;
	patch(
		url: string,
		body: Record<string, unknown>,
	): Promise<HttpClientResponse<HttpClientResponseBody>>;
	delete(url: string): Promise<HttpClientResponse<HttpClientResponseBody>>;
}

export class FetchHttpClientAdapter implements HttpClient {
	constructor(private readonly baseUrl: string) {}

	get<T>(
		url: string,
		searchParams: URLSearchParams = new URLSearchParams(),
	): Promise<HttpClientResponse<T>> {
		return this.request("GET", url, { searchParams });
	}

	post<T>(
		url: string,
		body: Record<string, unknown>,
	): Promise<HttpClientResponse<T>> {
		return this.request("POST", url, { body });
	}

	put<T>(
		url: string,
		body: Record<string, unknown>,
	): Promise<HttpClientResponse<T>> {
		return this.request("PUT", url, { body });
	}

	patch<T>(
		url: string,
		body: Record<string, unknown>,
	): Promise<HttpClientResponse<T>> {
		return this.request("PATCH", url, { body });
	}

	delete<T>(url: string): Promise<HttpClientResponse<T>> {
		return this.request("DELETE", url);
	}

	private async request<T>(
		method: HttpClientMethods,
		url: string,
		options: {
			searchParams?: URLSearchParams;
			body?: Record<string, unknown>;
		} = {},
	): Promise<HttpClientResponse<T>> {
		if (!this.baseUrl) {
			throw new Error("baseUrl is not defined");
		}

		const { searchParams, body } = options;
		const fullUrl = searchParams
			? `${this.baseUrl}${url}?${searchParams.toString()}`
			: `${this.baseUrl}${url}`;

		const headers = new Headers();

		if (body) {
			headers.append("Content-Type", "application/json");
		}

		const fetchOptions: RequestInit = {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		};

		const result = await fetch(fullUrl, fetchOptions);

		if (!result.ok) {
			throw new HttpClientError(result.statusText, {
				response: result,
				requestBody: body,
				method,
				url,
				searchParams,
			});
		}
		const responseBody = await result.json();

		return {
			method,
			body: responseBody,
			statusCode: result.status,
		};
	}
}
