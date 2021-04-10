import React, { FC } from "react";
import styles from "./Pool.module.scss";
import { Button } from "../../../../ui/button";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";
import { Box } from "../../../../modules/box";

export const Oops: FC<{ onClick(): void }> = ({ onClick }) => {
	return (
		<Box className={styles.box}>
			<HeadlinePlusSubline headline="Oops!" subline="You are not whitelisted 😔">
				<Button
					className={styles.button}
					variant="outlined"
					color="pink"
					size="large"
					onClick={onClick}
				>
					Close
				</Button>
			</HeadlinePlusSubline>
		</Box>
	);
};
