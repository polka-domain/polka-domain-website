import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Farms.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import { Flow } from "./ui/flow";
import { useWalletConnected } from "../../web3/use-wallet-connected";

type TokensType = {};

export const Farms: FC<TokensType> = () => {
	const connected = useWalletConnected();

	return (
		<>
			<section className={styles.component}>
				<GutterBox className={styles.gutter}>
					<div className={classNames(styles.wrapper, getModeClassName("light", theme))}>
						{connected ? <Flow className={styles.content} /> : <></>}
					</div>
				</GutterBox>
			</section>
		</>
	);
};
