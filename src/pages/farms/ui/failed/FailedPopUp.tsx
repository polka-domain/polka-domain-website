import React from "react";
import { PopUpContainer } from "../../../../ui/pop-up-container";
import styles from "./Failed.module.scss";
import { ScatteredContinuousState } from "../../../../hooks/use-continuous-state";
import { RC } from "../../../../helper/react/types";
import { Button } from "../../../../ui/button";
import { ButtonsGroup } from "../../../../modules/buttons-group";

export const FailedPopUp: RC<{
	control: ScatteredContinuousState<boolean>;
	onClick(): void;
	close(): void;
}> = ({ onClick, close, control }) => {
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
				<p className={styles.text}>Action failed, please try again</p>
				<ButtonsGroup className={styles.buttons}>
					<Button variant="outlined" size="large" color="pink" onClick={close}>
						Close
					</Button>
					<Button variant="contained" size="large" color="pink" onClick={onClick}>
						Try Again
					</Button>
				</ButtonsGroup>
			</div>
			<control.DefinePresent />
		</PopUpContainer>
	);
};
