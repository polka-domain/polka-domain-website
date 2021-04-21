import React from "react";
import { PopUpContainer } from "../../../../ui/pop-up-container";
import styles from "./Success.module.scss";
import { ScatteredContinuousState } from "../../../../hooks/use-continuous-state";
import { RC } from "../../../../helper/react/types";
import { Button } from "../../../../ui/button";

export const SuccessPopUp: RC<{
	text: string;
	control: ScatteredContinuousState<boolean>;
	close(): void;
}> = ({ text, close, control }) => {
	return (
		<PopUpContainer
			animated={control.present}
			visible={control.defined}
			onClose={close}
			size="lg"
			maxWidth={640}
		>
			<div className={styles.component}>
				<h2 className={styles.title}>Success !</h2>
				<p className={styles.text}>{text}</p>
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
