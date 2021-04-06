import { RC } from "../../helper/react/types";
import { ScatteredContinuousState } from "../../hooks/use-continuous-state";
import { PopUpContainer } from "../../ui/pop-up-container";
import styles from "./ConnectMetaPopUp.module.scss";

export const ConnectMetaPopUp: RC<{
	control: ScatteredContinuousState<boolean>;
	close(): void;
}> = ({ close, control }) => (
	<PopUpContainer animated={control.present} visible={control.defined} size="sm" onClose={close}>
		<div className={styles.component}>
			<h2 className={styles.title}>Connect to a wallet</h2>
			<ul className={styles.list}>
				<li className={styles.item}>
					<button className={styles.button}>Metamask</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>WalletConnect</button>
				</li>
			</ul>
			<control.DefinePresent />
		</div>
	</PopUpContainer>
);
