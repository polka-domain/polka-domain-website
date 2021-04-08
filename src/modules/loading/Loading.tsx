import React, { FC } from "react";
import { Box } from "../box/Box";
import styles from "./Loading.module.scss";

export const Loading: FC = () => {
	return (
		<Box className={styles.component}>
			<div className={styles.spinner} />
		</Box>
	);
};
