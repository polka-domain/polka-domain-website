import classNames from "classnames";
import React, { FC } from "react";

import styles from "./Header.module.scss";
import { MaybeWithClassName } from "../../helper/react/types";
import { NavLink } from "../../ui/button";
import { ColorLogo } from "../../ui/icons/Icons";
import { Navigation } from "./ui/navigation";

type HeaderType = {};

export const Header: FC<HeaderType & MaybeWithClassName> = ({ className }) => {
	return (
		<header className={classNames(styles.component, className)}>
			<div className={styles.wrapper}>
				<NavLink className={styles.logo} href="/" icon={<ColorLogo />} variant="text">
					Home
				</NavLink>
				<Navigation className={styles.navigation} />
				<NavLink className={styles.launch} variant="contained" color="grey" href="" disabled>
					Launch app
				</NavLink>
			</div>
		</header>
	);
};
