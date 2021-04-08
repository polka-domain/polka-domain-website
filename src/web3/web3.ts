import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { useMemo } from "react";

export const useWeb3 = (): Web3 => {
	const { active, library } = useWeb3React();
	return useMemo(() => (active ? new Web3(library.provider) : (undefined as any)), [
		active ? library.provider : null,
	]);
};
export const hexifyMessage = (msg: string): string =>
	`0x${Buffer.from(msg, "utf8").toString("hex")}`;
