import { useWeb3React } from "@web3-react/core";

export const useWalletConnected = (): boolean => {
	const { active } = useWeb3React();
	return active;
};
