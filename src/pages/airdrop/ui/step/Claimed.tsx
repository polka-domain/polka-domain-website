import styles from "./Step.module.scss";
import { Button } from "../../../../ui/button";
import { Box } from "../../../../modules/box";
import React, { FC } from "react";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";
import { NAME } from "../../../../const/const";

export const Claimed: FC<{ amount: number; onClick(): void }> = ({ amount, onClick }) => {
	return (
		<Box className={styles.box}>
			<HeadlinePlusSubline
				headline="Success!"
				subline={
					<>
						You have successfully claimed {amount} {NAME} 🎉
					</>
				}
			>
				<Button
					className={styles.button}
					color="pink"
					size="large"
					variant="outlined"
					onClick={onClick}
				>
					Close
				</Button>
			</HeadlinePlusSubline>
		</Box>
	);
};
