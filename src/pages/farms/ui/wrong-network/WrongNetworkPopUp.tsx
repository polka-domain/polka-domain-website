import React from "react";
import { PopUpContainer } from "../../../../ui/pop-up-container";
import styles from "./WrongNetwork.module.scss";
import { ScatteredContinuousState } from "../../../../hooks/use-continuous-state";
import { RC } from "../../../../helper/react/types";
import { Button } from "../../../../ui/button";

export const WrongNetworkPopUp: RC<{
	control: ScatteredContinuousState<boolean>;
	close(): void;
}> = ({ close, control }) => {
	return (
		<PopUpContainer
			animated={control.present}
			visible={control.defined}
			onClose={close}
			size="lg"
			maxWidth={640}
		>
			<div className={styles.component}>
				<h2 className={styles.title}>Oops!</h2>
				<p className={styles.text}>
					Wrong network detected!
					<br />
					Please switch to BSC network to claim your rewards
				</p>
				<Button
					className={styles.button}
					variant="outlined"
					size="large"
					color="pink"
					onClick={close}
				>
					Close
				</Button>
			</div>
			<control.DefinePresent />
		</PopUpContainer>
	);
};
