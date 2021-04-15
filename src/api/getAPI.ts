import {
	MAINNET_AIRDROP_ADDRESS,
	MAINNET_FIXED_SWAP_ADDRESS,
	TESTED_AIRDROP_ADDRESS,
	TESTED_FIXED_SWAP_ADDRESS,
} from "../const/const";

export const getEnv = (): "test" | "prod" => {
	const { hostname } = window.location;
	if (hostname.includes("vercel") || hostname === "localhost") {
		return "test";
	}
	return "prod";
};

export const getAPIBase = () => {
	if (getEnv() === "test") {
		return "https://test.api.polkadomain.org";
	}
	return "https://api.polkadomain.org";
};

export const getTokensAddress = () => {
	if (getEnv() === "test") {
		return TESTED_FIXED_SWAP_ADDRESS;
	}
	return MAINNET_FIXED_SWAP_ADDRESS;
};

export const getAirdropAddress = () => {
	if (getEnv() === "test") {
		return TESTED_AIRDROP_ADDRESS;
	}
	return MAINNET_AIRDROP_ADDRESS;
};
