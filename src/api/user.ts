import { getAPIBase } from "./getAPI";

export const readUserInformation = (eth: string): Promise<any> =>
	fetch(`${getAPIBase()}/api/users/${eth}`).then((res) => {
		console.log(res.status);
		if (res.status === 404) {
			return {};
		}
		return res.json();
	});

export const recordUserInformation = (
	values: Record<
		"eth_address" | "email" | "twitter" | "telegram" | "domain" | "sign" | "token",
		string
	>
) =>
	fetch(`${getAPIBase()}/api/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	}).then(async (res) => {
		console.log(res.status);
		if (res.status !== 200) {
			throw { status: res.status, data: await res.json() };
		}
		return res.json();
	});
