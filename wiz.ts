import type { QueryParams, ReqOpts } from "./types.ts";

export class Wiz {
	private static deserializeQueryParams(queryParams: QueryParams = {}) {
		if (Object.keys(queryParams).length === 0) {
			return "";
		}
		const params = new URLSearchParams(queryParams as Record<string, string>);
		return `?${params.toString()}`;
	}

	private static fillDefaultHeaders(options?: ReqOpts): ReqOpts {
		const hasBody = !!(options?.body ?? true);

		return {
			...options,
			headers: {
				accept: "application/json",
				"content-type": (hasBody ? "application/json" : undefined) as string,
				...options?.headers,
			},
		};
	}

	/**
	 * Sends a GET request to the given url.
	 * @param url the url to send the request to
	 * @param queryParams the optional parameter object to encode within the url
	 * @param options the optional raw fetch options
	 * @override
	 */
	async get<Response = unknown>(
		url: string,
		queryParams?: QueryParams,
		options?: ReqOpts
	) {
		const res = await fetch(
			`${url}${Wiz.deserializeQueryParams(queryParams)}`,
			Wiz.fillDefaultHeaders(options)
		);
		const data = await res.json();
		return data as Response;
	}

	/**
	 * Sends a POST request to the given url.
	 * @param url the url to send the request to
	 * @param data the data to send as the body of the request
	 * @param queryParams the optional parameter object to encode within the url
	 * @param options the optional raw fetch options
	 * @override
	 */
	async post<Response = unknown>(
		url: string,
		data?: unknown,
		queryParams?: QueryParams,
		options?: ReqOpts
	) {
		const res = await fetch(
			`${url}${Wiz.deserializeQueryParams(queryParams)}`,
			{
				...Wiz.fillDefaultHeaders(options),
				body: JSON.stringify(data),
			}
		);
		const resData = await res.json();
		return resData as Response;
	}
}
