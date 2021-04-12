import styles from "./Pool.module.scss";
import { Button } from "../../../../ui/button";
import { Box } from "../../../../modules/box";
import React, { FC } from "react";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";

export const ClaimedFail: FC<{ tryClick(): void; cancelClick(): void }> = ({
	cancelClick,
	tryClick,
}) => {
	return (
		<Box className={styles.box}>
			<HeadlinePlusSubline headline="Oops!" subline="Something went wrong, please try again 😅">
				<div className={styles.buttons}>
					<Button color="pink" size="large" variant="outlined" onClick={cancelClick}>
						Cancel
					</Button>
					<Button color="pink" size="large" variant="contained" onClick={tryClick}>
						Try Again
					</Button>
				</div>
			</HeadlinePlusSubline>
		</Box>
	);
};
