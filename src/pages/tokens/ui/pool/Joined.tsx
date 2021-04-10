import styles from "./Pool.module.scss";
import { Button } from "../../../../ui/button";
import { Box } from "../../../../modules/box";
import React, { FC } from "react";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";

export const Joined: FC<{ amount: string; onClick(): void }> = ({ amount, onClick }) => {
	return (
		<Box className={styles.box}>
			<HeadlinePlusSubline
				headline="Success!"
				subline={`You have successfully contributed ${amount} ETH 🎉`}
			>
				<Button
					className={styles.button}
					color="pink"
					size="large"
					variant="outlined"
					onClick={onClick}
				>
					Back to Auction
				</Button>
			</HeadlinePlusSubline>
		</Box>
	);
};
