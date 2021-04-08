import React, { FC } from "react";
import { defineFlowStep } from "../../../../modules/flow/definition";
import styles from "./Step2.module.scss";
import { NavLink } from "../../../../ui/button";
import { LOTTERY_INFO_PATH, LOTTERY_SHARE_PATH } from "../../../../const/const";

type Step2Type = {};

export const Step2Base: FC<Step2Type> = () => {
	return (
		<div className={styles.component}>
			<span className={styles.title}>You’re In!</span>
			<p className={styles.text}>Thank you for participating in our Whitelist Lottery </p>
			<div className={styles.links}>
				<NavLink href={LOTTERY_INFO_PATH} variant="outlined" color="pink" size="large">
					More Info
				</NavLink>
				<NavLink href={LOTTERY_SHARE_PATH} variant="contained" color="pink" size="large">
					Share
				</NavLink>
			</div>
		</div>
	);
};

export const Step2 = defineFlowStep({
	Body: Step2Base,
});
