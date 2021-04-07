import React, { FC } from "react";
import styles from "./YouAreIn.module.scss";

export const YouAreIn: FC = () => {
	return (
		<div className={styles.component}>
			<span className={styles.title}>You are already in the lottery 😉</span>
		</div>
	);
};
