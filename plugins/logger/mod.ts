import type { WizPlugin, WizRequest, WizResponse } from "../../mod.ts";

import { WizPluginEvent } from "../../mod.ts";

export class Logger implements WizPlugin {
	on(event: WizPluginEvent, req: WizRequest, res: WizResponse) {
		switch (event) {
			case WizPluginEvent.Response: {
				console.info(`${req.method} ${res.url} ${res.status}`);
			}
		}
	}
}
