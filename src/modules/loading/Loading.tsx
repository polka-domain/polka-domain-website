import React, { FC } from "react";
import { Box } from "../box/Box";
import styles from "./Loading.module.scss";
import { HeadlinePlusSubline } from "../headline-plus-subline";

export const Loading: FC<{ headline?: string }> = ({ headline }) => {
	return (
		<Box className={styles.component}>
			{headline && (
				<div className={styles.title}>
					<HeadlinePlusSubline headline={headline} />
				</div>
			)}
			<div className={styles.spinner} />
		</Box>
	);
};
