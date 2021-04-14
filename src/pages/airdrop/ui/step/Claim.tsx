import styles from "./Step.module.scss";
import { Button, NavLink } from "../../../../ui/button";
import { Box } from "../../../../modules/box";
import { ButtonsGroup } from "../../../../modules/buttons-group";
import { FC } from "react";
import { NAME } from "../../../../const/const";
import { walletConversion } from "../../../../utils/page/convertWallet";

type ClaimType = {
	amount: number;
	ethAddress: string;
	disabled: boolean;
	onClick(): void;
};

export const Claim: FC<ClaimType> = ({ amount, ethAddress, disabled, onClick }) => {
	return (
		<Box className={styles.box}>
			<p className={styles.title}>
				Airdrop:
				<br />
				<span>
					{amount} {NAME}
				</span>
			</p>
			<p className={styles.text}>{walletConversion(ethAddress)}</p>
			<ButtonsGroup className={styles.buttons}>
				<NavLink color="pink" size="large" variant="outlined" href="/">
					Cancel
				</NavLink>
				<Button color="pink" size="large" variant="contained" onClick={onClick} disabled={disabled}>
					{!disabled ? "Claim" : "Claimed"}
				</Button>
			</ButtonsGroup>
		</Box>
	);
};
