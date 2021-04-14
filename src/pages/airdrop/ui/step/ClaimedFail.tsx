import styles from "./Step.module.scss";
import { Button } from "../../../../ui/button";
import { Box } from "../../../../modules/box";
import React, { FC } from "react";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";
import { ButtonsGroup } from "../../../../modules/buttons-group";

export const ClaimedFail: FC<{ tryClick(): void; cancelClick(): void }> = ({
	cancelClick,
	tryClick,
}) => {
	return (
		<Box className={styles.box}>
			<HeadlinePlusSubline headline="Oops!" subline="Something went wrong, please try again 😅">
				<ButtonsGroup>
					<Button color="pink" size="large" variant="outlined" onClick={cancelClick}>
						Cancel
					</Button>
					<Button color="pink" size="large" variant="contained" onClick={tryClick}>
						Try Again
					</Button>
				</ButtonsGroup>
			</HeadlinePlusSubline>
		</Box>
	);
};
