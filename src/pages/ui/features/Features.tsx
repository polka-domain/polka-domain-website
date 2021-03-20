import { CSSProperties, FC } from "react";

import styles from "./Features.module.scss";
import { MaybeWithClassName } from "../../../helper/react/types";
import { GutterBox } from "../../../ui/gutter-box";
import { Body1, Heading2, Heading4 } from "../../../ui/typography";

import icon1 from "./assets/1.png";
import icon2 from "./assets/2.png";
import icon3 from "./assets/3.png";
import icon4 from "./assets/4.png";
import icon5 from "./assets/5.png";

type FeaturesType = {};

const FEATURES = {
	"DeFi powered NFT & Domain Mining": "DeFi mechanism allowing for domain / identity mining ",
	"Cross-chain & on-chain": "Execute on-chain and cross-chain transactions with your domain",
	"NFT & Domain Marketplace":
		"Polkadomain marketplace allows you to buy, sell and exchange Polkadomains though auction or fixed swaps",
	"Built on Polkadot":
		"PolkaDomain is built on substrate offering cross chain compatibility and interoperability backed by Polkadot",
	Privacy: "Your domain keeps your real wallet address hidden providing anonymity",
};

const ICONS = {
	"DeFi powered NFT & Domain Mining": icon1,
	"Cross-chain & on-chain": icon2,
	"NFT & Domain Marketplace": icon3,
	"Built on Polkadot": icon4,
	Privacy: icon5,
};

export const Features: FC<FeaturesType & MaybeWithClassName> = ({ className }) => {
	return (
		<section className={className}>
			<GutterBox>
				<Heading2 className={styles.title}>Features</Heading2>
				<ul className={styles.list}>
					{Object.keys(FEATURES).map((key) => {
						const item = FEATURES[key];
						return (
							<li
								className={styles.item}
								key={key}
								style={{ "--icon": `url(${ICONS[key]})` } as CSSProperties}
							>
								<Heading4 className={styles.caption} Component="h3" lighten={90}>
									{key}
								</Heading4>
								<Body1 className={styles.text} lighten={80}>
									{item}
								</Body1>
							</li>
						);
					})}
				</ul>
			</GutterBox>
		</section>
	);
};
