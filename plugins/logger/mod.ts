import type { WizPlugin } from "../../wiz.ts";
import type { WizRequest } from "../../types.ts";
import { WizPluginEvent } from "../../wiz.ts";

export class Logger implements WizPlugin {
	on(event: WizPluginEvent, req: WizRequest, res: Response) {
		switch (event) {
			case WizPluginEvent.Response: {
				console.info(`${req.method} ${res.url} ${res.status}`);
			}
		}
	}
}
