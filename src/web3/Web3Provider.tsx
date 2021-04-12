import React, { useEffect } from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ConnectWalletPopUp } from "../modules/connect-wallet-pop-up";
import { useControlPopUp } from "../ui/pop-up-container";

function getLibrary(provider) {
	const library = new Web3Provider(provider);
	library.pollingInterval = 8000;
	return library;
}

const ConnectionModal = () => {
	const { active } = useWeb3React();
	const { popUp, close, open } = useControlPopUp();
	useEffect(() => {
		if (active) {
			close();
		} else {
			open();
		}
	}, [active]);

	return popUp.defined ? (
		<ConnectWalletPopUp control={popUp} close={close} withoutClose={true} />
	) : null;
};

export const Web3ProviderRoot = ({ children }) => (
	<Web3ReactProvider getLibrary={getLibrary}>
		{children}
		<ConnectionModal />
	</Web3ReactProvider>
);
