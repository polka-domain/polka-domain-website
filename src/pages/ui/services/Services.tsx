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
	"Decentralized Domain Name Service":
		"Take control of your identity with Polka.Domain. Claim and save your unique domain as NFT.",
	"Cross-chain Transactions":
		"Execute cross-chain transactions while keeping your crypto address anonymous. Send and receive with your domain on BTC, ETH, DOT, Kusama and more.",
	"Domain and NFT Marketplace":
		"Aquire, exchange and sell Polka.domains through fixed swaps or auctions.",
};

const ICONS = {
	"Decentralized Domain Name Service": icon1,
	"Cross-chain Transactions": icon2,
	"Domain and NFT Marketplace": icon3,
};

export const Services: FC<ServicesType & MaybeWithClassName> = ({ className }) => {
	const keys = Object.keys(SERVICES);
	return (
		<section className={className}>
			<GutterBox className={styles.componentWrapper}>
				<Heading2 className={styles.title}>
					Our <br />
					Services
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
