export const getAPIBase = () => {
	const { hostname } = window.location;
	if (hostname.includes("vercel") || hostname === "localhost") {
		return "https://test.api.polkadomain.org";
	}
	return "https://api.polkadomain.org";
};
