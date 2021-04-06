import { RC } from "../../helper/react/types";
import { ScatteredContinuousState } from "../../hooks/use-continuous-state";
import { PopUpContainer } from "../../ui/pop-up-container";
import styles from "./ConnectMetaPopUp.module.scss";
import { useState } from "react";
import { hasMetaMask, useEthereum } from "../../helper/metamask";
import { walletConnect } from "../../helper/wallet-connect";

export type MetaActions = {
	signPersonalMessage(message: string, account: string): Promise<string>;
};

export const ConnectMetaPopUp: RC<{
	control: ScatteredContinuousState<boolean>;
	close(): void;
	next(account: string, actions: MetaActions): void;
}> = ({ close, control, next }) => {
	const [connecting, setConnectionStatus] = useState(false);

	const connectMetamask = async () => {
		try {
			const eth = useEthereum();
			setConnectionStatus(true);
			const accounts = await eth.request({ method: "eth_requestAccounts" });
			next(accounts[0], {
				async signPersonalMessage(message, account = accounts[0]) {
					const msg = `0x${Buffer.from(account, "utf8").toString("hex")}`;
					return await eth.request({
						method: "personal_sign",
						params: [msg, account],
					});
				},
			});
		} catch (e) {
			console.error(e);
		} finally {
			setConnectionStatus(false);
		}
	};

	const connectWalletConnect = async () => {
		try {
			setConnectionStatus(true);

			const { connector, accounts } = await walletConnect();

			next(accounts[0], {
				async signPersonalMessage(message, account = accounts[0]) {
					const msgParams = [`0x${Buffer.from(account, "utf8").toString("hex")}`, account];
					return connector.signPersonalMessage(msgParams);
				},
			});
		} catch (e) {
			console.error(e);
		} finally {
			setConnectionStatus(false);
		}
	};

	return (
		<PopUpContainer
			animated={control.present}
			visible={control.defined}
			size="sm"
			onClose={connecting ? undefined : close}
		>
			<div className={styles.component}>
				<h2 className={styles.title}>Connect to a wallet</h2>
				<ul className={styles.list}>
					<li className={styles.item}>
						{hasMetaMask() ? (
							<button
								className={styles.button}
								type="button"
								onClick={connectMetamask}
								disabled={connecting}
							>
								Metamask
							</button>
						) : (
							<span>Metamask not installed</span>
						)}
					</li>
					<li className={styles.item}>
						<button
							className={styles.button}
							type="button"
							onClick={connectWalletConnect}
							disabled={connecting}
						>
							WalletConnect
						</button>
					</li>
				</ul>
				<control.DefinePresent />
			</div>
		</PopUpContainer>
	);
};
