import React, { FC } from "react";
import styles from "./Loading.module.scss";

export const Loading: FC = () => {
	return (
		<div className={styles.component}>
			<div className={styles.spinner} />
		</div>
	);
};
