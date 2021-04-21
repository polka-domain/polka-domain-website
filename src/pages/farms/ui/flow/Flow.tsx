import classNames from "classnames";
import styles from "./Flow.module.scss";
import { FC, useEffect, useState } from "react";
import { Default } from "../default";
import { Claim } from "../claim";
import { Stake } from "../stake";
import { UnStake } from "../un-stake";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { useWeb3React } from "@web3-react/core";
import { useControlPopUp } from "../../../../ui/pop-up-container";
import { WrongNetworkPopUp } from "../wrong-network";

export enum NETWORK {
	BSC = "BSC",
	HEC0 = "HEC0",
	ETH = "ETH",
}

export const getNetworkByChainId = (chainId: number) => {
	switch (chainId) {
		case 56:
			return NETWORK.BSC;
		case 128:
			return NETWORK.HEC0;
		default:
			return NETWORK.ETH;
	}
};

enum ACTION {
	default = "",
	claim = "claim",
	unStake = "un-stake",
	stake = "stake",
}

export const Flow: FC<MaybeWithClassName> = ({ className }) => {
	const [action, setAction] = useState<ACTION>(ACTION.default);

	const backAction = () => {
		setAction(ACTION.default);
	};

	const content = () => {
		switch (action) {
			case ACTION.default:
				return (
					<Default
						onClaim={network !== NETWORK.ETH ? networkOpen : () => setAction(ACTION.claim)}
						onStake={network !== NETWORK.ETH ? networkOpen : () => setAction(ACTION.stake)}
						onUnStake={network !== NETWORK.ETH ? networkOpen : () => setAction(ACTION.unStake)}
					/>
				);

			case ACTION.claim:
				return <Claim onBack={backAction} />;

			case ACTION.unStake:
				return <UnStake onBack={backAction} />;

			case ACTION.stake:
				return <Stake onBack={backAction} />;
		}
	};

	//wrong network
	const { chainId } = useWeb3React();
	const { popUp: networkPopUp, close: networkClose, open: networkOpen } = useControlPopUp();
	const [network, setNetwork] = useState<NETWORK | undefined>(undefined);

	useEffect(() => {
		chainId && setNetwork(getNetworkByChainId(chainId));
	}, [chainId]);

	return (
		<>
			<div className={classNames(className, styles.component)}>{content()}</div>
			{networkPopUp.defined ? (
				<WrongNetworkPopUp control={networkPopUp} close={networkClose} />
			) : null}
		</>
	);
};
