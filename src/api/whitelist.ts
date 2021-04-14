import { getAPIBase } from "./getAPI";

export const readWhitelistStatus = (): Promise<boolean> =>
	fetch(`${getAPIBase()}/api/whitelist/status`).then((res) => {
		return res.status === 200;
	});
