import { CSSProperties, FC } from "react";

import styles from "./Services.module.scss";
import { MaybeWithClassName } from "../../../helper/react/types";
import { GutterBox } from "../../../ui/gutter-box";
import { Body1, Heading2, Heading3 } from "../../../ui/typography";

import icon1 from "./assets/1.png";
import icon2 from "./assets/2.png";
import icon3 from "./assets/3.png";

type ServicesType = {};

const SERVICES = {
	"Decentralized domain name service":
		"Your identity under one recognisable domain. Claim your digital identity as an NFT.",
	"Cross-chain transactions":
		"Execute cross-chain transactions, receive any asset on your domain. BTC, ETH, DOT, Kusama, and more. All while keeping your real wallet anonymous",
	"Domain and NFT Marketplace":
		"Aquire, exchange and sell Polkadomains through fixed swaps or an auction. ",
};

const ICONS = {
	"Decentralized domain name service": icon1,
	"Cross-chain transactions": icon2,
	"Domain and NFT Marketplace": icon3,
};

export const Services: FC<ServicesType & MaybeWithClassName> = ({ className }) => {
	const keys = Object.keys(SERVICES);
	return (
		<section className={className}>
			<GutterBox className={styles.componentWrapper}>
				<Heading2 className={styles.title}>
					Our <br />
					Servises
				</Heading2>
				<ul className={styles.list} style={{ "--count": keys.length } as CSSProperties}>
					{keys.map((key) => {
						const item = SERVICES[key];
						return (
							<li
								className={styles.item}
								key={key}
								style={{ "--icon": `url(${ICONS[key]})` } as CSSProperties}
							>
								<div className={styles.wrapper}>
									<Heading3 className={styles.caption} Component="h3" lighten={90}>
										{key}
									</Heading3>
									<Body1 className={styles.text} lighten={80}>
										{item}
									</Body1>
								</div>
							</li>
						);
					})}
				</ul>
			</GutterBox>
		</section>
	);
};
