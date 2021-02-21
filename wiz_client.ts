import type { QueryParams, ReqOpts } from "./types.ts";

import { Wiz } from "./wiz.ts";

export class WizClient extends Wiz {
	readonly baseUrl: string;

	constructor(baseUrl: string) {
		super();
		this.baseUrl = baseUrl.endsWith("/")
			? baseUrl.slice(0, baseUrl.length - 1)
			: baseUrl;
	}

	/**
	 * Sends a GET request to the given endpoint.
	 * @param endpoint the url path to send the request to
	 * @param queryParams the optional parameter object to encode within the url
	 * @param options the optional raw fetch options
	 * @override
	 */
	async get<Response = unknown>(
		endpoint: string,
		queryParams?: QueryParams,
		options?: ReqOpts
	) {
		return await super.get<Response>(
			`${this.baseUrl}${endpoint}`,
			queryParams,
			options
		);
	}

	/**
	 * Sends a POST request to the given endpoint.
	 * @param endpoint the url path to send the request to
	 * @param data the data to send as the body of the request
	 * @param queryParams the data to encode within the payload url
	 * @param options the optional raw fetch options
	 * @override
	 */
	async post<Response = unknown>(
		endpoint: string,
		data?: unknown,
		queryParams?: Record<string, unknown>,
		options?: ReqOpts
	) {
		return await super.post<Response>(
			`${this.baseUrl}${endpoint}`,
			data,
			queryParams,
			options
		);
	}
}
