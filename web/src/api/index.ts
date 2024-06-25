import { FetchHttpClientAdapter } from "../adapters/fetch-adapter";
import { Auth } from "./auth";

const BASE_URL = "http://localhost:8080";

export const api = {
	auth: new Auth(new FetchHttpClientAdapter(BASE_URL)),
};
