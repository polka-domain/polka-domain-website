import { RC } from "../../helper/react/types";
import { ScatteredContinuousState } from "../../hooks/use-continuous-state";
import { PopUpContainer } from "../../ui/pop-up-container";
import styles from "./ConnectWalletPopUp.module.scss";
import { useState } from "react";
import { hasMetaMask } from "../../helper/metamask";
import { MetaIcon, RightArrow, WalletIcon } from "./icons";
import { useWalletConnector } from "../../web3/connections";

export const ConnectWalletPopUp: RC<{
	control: ScatteredContinuousState<boolean>;
	withoutClose?: boolean;
	close(): void;
}> = ({ close, control, withoutClose }) => {
	const [connecting, setConnectionStatus] = useState(false);
	const connect = useWalletConnector();

	const connectMetamask = async () => {
		try {
			setConnectionStatus(true);
			await connect("MetaMask");
		} catch (e) {
			console.error(e);
		} finally {
			setConnectionStatus(false);
		}
	};

	const connectWalletConnect = async () => {
		try {
			setConnectionStatus(true);
			await connect("WalletConnect");
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
			withoutClose={withoutClose}
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
								<span className={styles.icon}>
									<MetaIcon />
								</span>
								Metamask
								<RightArrow className={styles.arrow} />
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
							<span className={styles.icon}>
								<WalletIcon />
							</span>
							WalletConnect
							<RightArrow className={styles.arrow} />
						</button>
					</li>
				</ul>
				<control.DefinePresent />
			</div>
		</PopUpContainer>
	);
};
