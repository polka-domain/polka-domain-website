import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect } from "react";
import { KNOWN_WALLETS, KNOWN_WALLET_KEY } from "./wallets";

const SELECT_WEB3_PROVIDER_KEY = "SELECT_WEB3_PROVIDER_KEY";

export const useWalletConnector = () => {
	const { activate } = useWeb3React();

	return useCallback((name: KNOWN_WALLET_KEY) => {
		activate(KNOWN_WALLETS[name]()).then(
			() => {
				// store user choice
				window.localStorage.setItem(SELECT_WEB3_PROVIDER_KEY, name);
			},
			(err) => {
				console.error(err);
				// reset failed attempt
				window.localStorage.setItem(SELECT_WEB3_PROVIDER_KEY, null);
				throw err;
			}
		);
	}, []);
};

export const useAutomaticReconnection = () => {
	const activate = useWalletConnector();

	useEffect(() => {
		const chosenProvider = window && window.localStorage.getItem(SELECT_WEB3_PROVIDER_KEY);
		if (chosenProvider) {
			console.log("reactivate", chosenProvider);
			activate(KNOWN_WALLETS[chosenProvider]);
		}
	}, []);
};
