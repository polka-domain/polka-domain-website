import type { FC } from "react";

import styles from "./Navigation.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { NavLink, Button } from "../../../../ui/button";
import { SOCIAL, TESTNET_PATH } from "../../../../const/const";
import { Arrow, GitHub, Medium, Telegram, Twitter } from "../../../../ui/icons/Icons";

export type LinkType = {
	link: string;
	links: Record<string, string>;
};

type NavigationType = {
	links?: Record<string, string | LinkType>;
};

type ComponentType = NavigationType & MaybeWithClassName;

const HEADER_LINKS = {
	Docs: "/PD mind map ENG ver.pdf",
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
	className: styles.link,
	variant: "text" as "text" | "contained",
	size: "medium" as "medium" | "small",
	color: "grey" as "grey",
};

export const Navigation: FC<ComponentType> = ({ className, links = HEADER_LINKS }) => {
	return (
		<div className={className}>
			<ul className={styles.list}>
				{Object.keys(links).map((key) => {
					const item = links[key];
					const hasDropdown = typeof item !== "string";
					const href = typeof item !== "string" ? undefined : item;
					const subLinks = typeof item !== "string" ? item : undefined;
					return (
						<li key={key} className={styles.item}>
							{href !== undefined ? (
								<NavLink href={href} {...settings}>
									{key}
								</NavLink>
							) : (
								<Button iconAfter={<Arrow className={styles.arrow} />} {...settings}>
									{key}
								</Button>
							)}
							{hasDropdown && subLinks && (
								<div className={styles.dropdown} color="bright-idea">
									<ul className={styles.subList}>
										{Object.keys(subLinks).map((subKey) => {
											const subItem = subLinks[subKey];
											return (
												<li key={subKey} className={styles.subItem}>
													<NavLink className={styles.subLink} href={subItem} variant="text">
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
