import type { ReqOpts, WizPlugin, WizRequest } from "./types.ts";
import { Method, WizPluginEvent } from "./constants.ts";

export class Wiz {
	#plugins: WizPlugin[];

	/** @param plugins the plugins to use that can manipulate and read your data */
	constructor(plugins: WizPlugin[] = []) {
		this.#plugins = plugins;
	}

	private static stringifyQueryParams(queryParams?: Record<string, string>) {
		if (queryParams === undefined || Object.keys(queryParams).length === 0) {
			return "";
		}
		const params = new URLSearchParams(queryParams);
		return `?${params.toString()}`;
	}

	#fetch = async <Data = unknown>(
		data: ReqOpts & { data?: unknown } & WizRequest
	) => {
		const { url, method, params, fetchOpts } = data;
		const reqUrl = `${url}${Wiz.stringifyQueryParams(params)}`;
		const hasBody = data.data !== undefined;
		const res = await fetch(reqUrl, {
			method,
			body: hasBody
				? typeof data.data === "object"
					? JSON.stringify(data)
					: data.toString()
				: undefined,
			...fetchOpts,
		});
		this.#dispatchPluginEvent(
			WizPluginEvent.Response,
			{ url: reqUrl, method },
			res
		);
		return (await res.json().catch((e) => {
			console.error(
				`Failed to parse the response of the \`${method}\` request to \`${reqUrl}\` as JSON. There is most likely a discrete error message below.`
			);
			throw e;
		})) as Data;
	};

	#dispatchPluginEvent = (
		event: WizPluginEvent,
		req: WizRequest,
		res: Response
	) => {
		return Promise.allSettled(
			this.#plugins.map((plugin) => plugin.on(event, req, res))
		);
	};

	/**
	 * Sends a GET request to the given url.
	 * @param url the url to send the request to
	 * @param options the options to customize your request
	 */
	async get<Data = unknown>(url: string, options?: ReqOpts) {
		const res = await this.#fetch({
			url,
			method: Method.Get,
			...options,
		});
		return res as Data;
	}

	/**
	 * Sends a POST request to the given url.
	 * @param url the url to send the request to
	 * @param data the data to send as the body of the request
	 * @param options the options to customize your request
	 */
	async post<Response = unknown>(
		url: string,
		data?: unknown,
		options?: ReqOpts
	) {
		const res = await this.#fetch({
			url,
			method: Method.Post,
			data,
			...options,
		});
		return res as Response;
	}
}
