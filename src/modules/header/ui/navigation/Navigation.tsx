import type { FC } from "react";
import classNames from "classnames";
import styles from "./Navigation.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { NavLink, Button } from "../../../../ui/button";
import { SOCIAL, TESTNET_PATH, WHITELIST_PATH } from "../../../../const/const";
import { Arrow, GitHub, Medium, Telegram, Twitter } from "../../../../ui/icons/Icons";
import { NextRouter, withRouter } from "next/router";

export type LinkType = {
	link: string;
	links: Record<string, string>;
};

type NavigationType = {
	links?: Record<string, string | LinkType>;
};

type ComponentType = NavigationType & MaybeWithClassName & { router?: NextRouter };

const HEADER_LINKS = {
	Whitelist: WHITELIST_PATH,
	Docs: "/Flowchart Polkadomain.pdf",
	Social: SOCIAL,
	Testnet: TESTNET_PATH,
};

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

export const NavigationBase: FC<ComponentType> = ({ className, links = HEADER_LINKS, router }) => {
	return (
		<div className={className}>
			<ul className={styles.list}>
				{Object.keys(links).map((key) => {
					const item = links[key];
					const hasDropdown = typeof item !== "string";
					const href = typeof item !== "string" ? undefined : item;
					const subLinks = typeof item !== "string" ? item : undefined;

					const active = item.children
						? Object.values(item.children).some((item) => router.pathname === item)
						: router.pathname === item;
					return (
						<li key={key} className={styles.item}>
							{href !== undefined ? (
								<NavLink
									className={classNames(styles.link, active && styles.active)}
									href={href}
									{...settings}
								>
									{key}
								</NavLink>
							) : (
								<Button
									className={styles.link}
									iconAfter={<Arrow className={styles.arrow} />}
									{...settings}
								>
									{key}
								</Button>
							)}
							{hasDropdown && subLinks && (
								<div className={styles.dropdown}>
									<ul className={styles.subList}>
										{Object.keys(subLinks).map((subKey) => {
											const subItem = subLinks[subKey];
											return (
												<li key={subKey} className={styles.subItem}>
													<NavLink className={styles.subLink} href={subItem}>
														<span className={styles.icon}>{ICONS[subKey]}</span>
														{subKey}
													</NavLink>
												</li>
											);
										})}
									</ul>
								</div>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export const Navigation = withRouter(
	({ router, ...props }: NavigationType & { router: NextRouter }) => {
		return <NavigationBase router={router} {...props} />;
	}
);
