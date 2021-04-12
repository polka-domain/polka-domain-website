import React, { FC } from "react";
import styles from "./Closed.module.scss";
import { Box } from "../../../../modules/box";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";
import { NavLink } from "../../../../ui/button";

export const Closed: FC = () => {
	return (
		<Box className={styles.component}>
			<HeadlinePlusSubline
				headline={
					<>
						The Whitelist Lottery Event
						<br />
						Has Concluded
					</>
				}
				subline="Thank you for your interest!"
			>
				<NavLink className={styles.button} variant="outlined" size="large" color="pink" href="/">
					Close
				</NavLink>
			</HeadlinePlusSubline>
		</Box>
	);
};
