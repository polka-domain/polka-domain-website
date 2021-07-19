import type { CSSProperties, FC, ReactNode } from "react";
import classNames from "classnames";
import styles from "./MobileNavigation.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { NavLink } from "../../../../ui/button";
import { APP_PATH, SOCIAL, MOBILE_HEADER_LINKS } from "../../../../const/const";
import { GitHub, Medium, Telegram, Twitter } from "../../../../ui/icons/Icons";
import React from "react";
import { useWindowSize } from "../../../../hooks/use-window-size";

export type LinkType = {
	link: string;
	links: Record<string, string>;
};

type MobileNavigationType = {
	sideEffect?: ReactNode;
	links?: Record<string, string>;
	onClick?(): void;
};

type ComponentType = MobileNavigationType & MaybeWithClassName;

const ICONS = {
	Github: <GitHub />,
	Twitter: <Twitter />,
	Telegram: <Telegram />,
	Medium: <Medium />,
};

const settings = {
	variant: "text" as "text" | "contained",
	size: "medium" as "medium" | "small",
	color: "grey" as "grey",
};

export const MobileNavigation: FC<ComponentType> = ({
	className,
	links = MOBILE_HEADER_LINKS,
	sideEffect,
	onClick,
}) => {
	const windowHeight = useWindowSize()[1];

	return (
		<div
			className={classNames(className, styles.component)}
			style={{ "--window-height": `${windowHeight}px` } as CSSProperties}
		>
			<ul className={styles.list}>
				{Object.keys(links).map((key) => {
					return (
						<li key={key} className={styles.item}>
							<NavLink href={links[key]} onClick={onClick} {...settings}>
								{key}
							</NavLink>
						</li>
					);
				})}
			</ul>
			<NavLink className={styles.launch} variant="contained" color="grey" href={APP_PATH} disabled>
				Launch App
			</NavLink>
			<ul className={styles.socialList}>
				{Object.keys(SOCIAL).map((key) => {
					return (
						<li key={key}>
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
