import styles from "./Step.module.scss";
import { NavLink } from "../../../../ui/button";
import { Box } from "../../../../modules/box";
import React, { FC } from "react";

export const Counter: FC<{ time: string }> = ({ time }) => {
	return (
		<Box className={styles.box}>
			<p className={styles.start}>The airdrop will start in</p>
			<p className={styles.timer}>{time}</p>
			<NavLink className={styles.close} color="pink" size="large" variant="outlined" href="/">
				Close
			</NavLink>
		</Box>
	);
};
