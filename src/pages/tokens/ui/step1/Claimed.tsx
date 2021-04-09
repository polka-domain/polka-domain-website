import styles from "./Step1.module.scss";
import { Button } from "../../../../ui/button";
import { Box } from "../../../../modules/box";
import React, { FC } from "react";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";

export const Claimed: FC<{ onClick(): void }> = ({ onClick }) => {
	return (
		<Box className={styles.box}>
			<HeadlinePlusSubline headline="Success!" subline="You've successfully claimed your token 🎉">
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
