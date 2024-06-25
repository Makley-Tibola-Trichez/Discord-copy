export type HttpClientMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface HttpClientErrorCause {
  response: Response;
  requestBody?: Record<string, unknown>;
  url: string;
  method: HttpClientMethods;
  searchParams?: URLSearchParams;
}

export class HttpClientError extends Error {
  name = "HttpClientError";
  // private _responseBody: Record<string, unknown> | undefined;

  constructor(
    public readonly message: string,
    public readonly cause: HttpClientErrorCause,
  ) {
    super(message, { cause });

    Object.setPrototypeOf(this, HttpClientError.prototype);
    Error.captureStackTrace?.(this, HttpClientError);

    let _message = `${message}\n`;

    _message += `StatusCode: ${cause.method} ${cause.response.status} ${cause.response.statusText}n`;
    _message += `url: ${cause.url}`;
    if (cause.searchParams) {
      _message += `searchParams: ${cause.searchParams.toString()}\n`;
    }
    if (cause.requestBody) {
      _message += `Body request: ${JSON.stringify(
        cause.requestBody,
        null,
        2,
      )}\n`;
    }

    this.message = _message;
  }
  // public get responseBody(): unknown {
  // 	return this._responseBody;
  // }
  // public set responseBody(response: Response) {
  // 	try {
  // 		response.json().then((body) => {
  // 			this._responseBody = body;
  // 		});
  // 	} catch (error) {
  // 		this._responseBody = undefined;
  // 	}
  // }
}
