import styles from "./Oops.module.scss";
import { NavLink } from "../../../../ui/button";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";
import { Box } from "../../../../modules/box";

export const Oops = () => {
	return (
		<Box className={styles.box}>
			<HeadlinePlusSubline headline="Oops!" subline="You are not whitelisted 😔">
				<NavLink className={styles.button} variant="outlined" color="pink" size="large" href="/">
					Close
				</NavLink>
			</HeadlinePlusSubline>
		</Box>
	);
};
