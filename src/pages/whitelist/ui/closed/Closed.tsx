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
				subline="Thank you for your interest! Winners will be announced and contacted by our team via email shortly. Stay tuned!"
			>
				<NavLink className={styles.button} variant="outlined" size="large" color="pink" href="/">
					Closed
				</NavLink>
			</HeadlinePlusSubline>
		</Box>
	);
};
