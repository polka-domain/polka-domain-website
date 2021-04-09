import React, { FC } from "react";
import styles from "./Oops.module.scss";
import { NavLink } from "../../../../ui/button";
import { WHITELIST_PATH } from "../../../../const/const";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";
import { Box } from "../../../../modules/box";

export const Oops: FC = () => {
	return (
		<Box className={styles.component}>
			<HeadlinePlusSubline headline="Oops!" subline="You are not whitelisted 😔">
				<NavLink
					className={styles.link}
					href={WHITELIST_PATH}
					variant="outlined"
					color="pink"
					size="large"
				>
					Close
				</NavLink>
			</HeadlinePlusSubline>
		</Box>
	);
};
