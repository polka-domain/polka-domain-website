import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Tokens.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import {
	ConnectWalletPopUp,
	MetaActions,
} from "../../modules/connect-wallet-pop-up/ConnectWalletPopUp";
import { useControlPopUp } from "../../ui/pop-up-container";
import { readUserInformation } from "../../api/user";
import { Loading } from "../../modules/loading";
import { Oops } from "./ui/oops";
import { Flow } from "../../modules/flow";
import { defineFlow } from "../../modules/flow/definition";
import { Step1 } from "./ui/step1";

type TokensType = {};

const STEPS = defineFlow(Step1);

export const Tokens: FC<TokensType> = () => {
	const [metaConnect, setMetaConnect] = useState<MetaActions>(undefined);

	const { popUp, close, toggle } = useControlPopUp();

	const [userInformation, setUserInformation] = useState(undefined);

	useEffect(() => {
		if (metaConnect === undefined) {
			toggle();
		}
	}, [metaConnect]);

	const [ethereumAddress, setEthereumAddress] = useState(undefined);

	useEffect(() => {
		if (ethereumAddress) {
			readUserInformation(ethereumAddress).then((info) => setUserInformation(info));
		}
	}, [ethereumAddress]);

	return (
		<>
			<section className={styles.component}>
				<GutterBox className={styles.gutter}>
					<div className={classNames(styles.wrapper, getModeClassName("light", theme))}>
						{metaConnect && !userInformation && <Loading />}
						{userInformation && (
							<div>
								{userInformation.email ? (
									<Flow steps={STEPS} onComplete={() => alert("Finish")}>
										{(body) => body}
									</Flow>
								) : (
									<Oops />
								)}
							</div>
						)}
					</div>
				</GutterBox>
			</section>
			{!metaConnect && popUp.defined && (
				<ConnectWalletPopUp
					control={popUp}
					close={close}
					next={(eth, actions) => {
						setMetaConnect(actions);
						setEthereumAddress(eth);
						close();
					}}
					withoutClose={true}
				/>
			)}
		</>
	);
};
