import classNames from "classnames";
import React, { FC } from "react";

import styles from "./Footer.module.scss";
import { MaybeWithClassName } from "../../helper/react/types";
import { GitHub, Logo, Medium, Telegram, Twitter } from "../../ui/icons/Icons";
import { NavLink } from "../../ui/button";
import { SOCIAL } from "../../const/const";
import { Body1 } from "../../ui/typography";

type FooterType = {};

export const ICONS = {
	Github: <GitHub />,
	Twitter: <Twitter />,
	Telegram: <Telegram />,
	Medium: <Medium />,
};

export const Footer: FC<FooterType & MaybeWithClassName> = ({ className }) => {
	return (
		<footer className={classNames(styles.component, className)}>
			<div className={styles.wrapper}>
				<Body1 className={styles.text} lighten={60} color="white">
					Polkadomain. All rights reserved
				</Body1>
				<ul className={styles.list}>
					{Object.keys(SOCIAL).map((key) => {
						return (
							<li key={key} className={styles.item}>
								<NavLink
									href={SOCIAL[key]}
									variant="text"
									size="medium"
									color="grey"
									icon={ICONS[key]}
								>
									{key}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
		</footer>
	);
};
