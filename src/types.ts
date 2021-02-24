import type { Method, WizPluginEvent } from "./constants.ts";

export interface ReqOpts {
	params?: Record<string, string>;
	fetchOpts?: RequestInit;
}

export interface WizRequest {
	url: string;
	method: Method;
}

export type WizResponse = Response;

export interface WizPlugin {
	on: (
		event: WizPluginEvent,
		req: WizRequest,
		res: WizResponse
	) => void | Promise<void>;
}
