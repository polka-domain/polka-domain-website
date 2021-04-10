import React, { FC } from "react";
import styles from "./Step2.module.scss";
import { NavLink } from "../../../../ui/button";
import { LOTTERY_INFO_PATH, LOTTERY_SHARE_PATH } from "../../../../const/const";
import { Box } from "../../../../modules/box";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";

type Step2Type = {};

export const Step2: FC<Step2Type> = () => {
	return (
		<Box className={styles.component}>
			<HeadlinePlusSubline
				headline="You’re In!"
				subline="Thank you for participating in our Whitelist Lottery"
			>
				<div className={styles.links}>
					<NavLink href={LOTTERY_INFO_PATH} variant="outlined" color="pink" size="large">
						More Info
					</NavLink>
					<NavLink href={LOTTERY_SHARE_PATH} variant="contained" color="pink" size="large">
						Share
					</NavLink>
				</div>
			</HeadlinePlusSubline>
		</Box>
	);
};
