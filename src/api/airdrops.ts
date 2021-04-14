import { getAPIBase } from "./getAPI";

export const readUserInformation = (eth: string): Promise<any> =>
	fetch(`${getAPIBase()}/api/airdrops/${eth}`).then((res) => {
		console.log(res.status);
		if (res.status === 404) {
			return {};
		}
		return res.json();
	});
