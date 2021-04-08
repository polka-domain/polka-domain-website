import React, { FC } from "react";
import styles from "./YouAreIn.module.scss";
import { Box } from "../../../../modules/box/Box";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";

export const YouAreIn: FC = () => {
	return (
		<Box className={styles.component}>
			<HeadlinePlusSubline headline="You are already in the lottery 😉" />
		</Box>
	);
};
