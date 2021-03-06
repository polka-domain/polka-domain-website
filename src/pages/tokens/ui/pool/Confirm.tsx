import styles from "./Pool.module.scss";
import { Button } from "../../../../ui/button";
import { Box } from "../../../../modules/box";
import { FC } from "react";
import { ButtonsGroup } from "../../../../modules/buttons-group";

export const Confirm: FC<{
	balance: string;
	amount: string;
	cancelClick(): void;
	confirmClick(): void;
}> = ({ balance, amount, cancelClick, confirmClick }) => {
	return (
		<Box className={styles.box}>
			<p className={styles.title}>
				Your Contribution:
				<br />
				<span>{amount} ETH</span>
			</p>
			<p className={styles.text}>Your balance: {balance} ETH</p>
			<ButtonsGroup className={styles.buttons}>
				<Button color="pink" size="large" variant="outlined" onClick={cancelClick}>
					Cancel
				</Button>
				<Button color="pink" size="large" variant="contained" onClick={confirmClick}>
					Contribute
				</Button>
			</ButtonsGroup>
		</Box>
	);
};
