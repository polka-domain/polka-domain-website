import type { CSSProperties, FC, ReactNode } from "react";
import classNames from "classnames";
import styles from "./MobileNavigation.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { NavLink } from "../../../../ui/button";
import { SOCIAL, TESTNET_PATH } from "../../../../const/const";
import { GitHub, Medium, Telegram, Twitter } from "../../../../ui/icons/Icons";
import React from "react";
import { useWindowSize } from "../../../../hooks/use-window-size";

export type LinkType = {
	link: string;
	links: Record<string, string>;
};

type NavigationType = {
	sideEffect?: ReactNode;
};

type ComponentType = NavigationType & MaybeWithClassName;

const HEADER_LINKS = {
	Docs: "/Flowchart Polkadomain.pdf",
	Testnet: TESTNET_PATH,
};

const ICONS = {
	Github: <GitHub />,
	Twitter: <Twitter />,
	Telegram: <Telegram />,
	Medium: <Medium />,
};

const settings = {
	className: styles.link,
	activeClassName: styles.active,
	variant: "text" as "text" | "contained",
	size: "medium" as "medium" | "small",
	color: "grey" as "grey",
};

export const MobileNavigation: FC<ComponentType> = ({ className, sideEffect }) => {
	const windowHeight = useWindowSize()[1];

	return (
		<div
			className={classNames(className, styles.component)}
			style={{ "--window-height": `${windowHeight}px` } as CSSProperties}
		>
			<ul className={styles.list}>
				{Object.keys(HEADER_LINKS).map((key) => {
					return (
						<li key={key} className={styles.item}>
							<NavLink href={HEADER_LINKS[key]} {...settings}>
								{key}
							</NavLink>
						</li>
					);
				})}
			</ul>
			<NavLink className={styles.launch} variant="contained" color="grey" href="" disabled>
				Launch App
			</NavLink>
			<ul className={styles.socialList}>
				{Object.keys(SOCIAL).map((key) => {
					const subItem = SOCIAL[key];
					return (
						<li key={key} className={styles.socialItem}>
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
			{sideEffect}
		</div>
	);
};
