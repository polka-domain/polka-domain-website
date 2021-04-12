import { CSSProperties, FC } from "react";

import styles from "./Features.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { GutterBox } from "../../../../ui/gutter-box";
import { Body1, Heading2, Heading4 } from "../../../../ui/typography";

import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";

type FeaturesType = {};

const FEATURES = {
	"Built on Polkadot":
		"Polka.Domain is built on substrate offering cross-chain compatibility and interoperability backed by Polkadot.",
	"Scalable and Efficient":
		"Polka.Domain nodes provide efficient and scalable consensus mechanism that supports hundreds of nodes with thousands of transactions per seconds.",
	"Privacy and Ownership":
		"Polka.Domain integrates crypto addresses to a decentralized domain while preserving your privacy. Completely owned and controlled by you.",
};

const ICONS = {
	"Built on Polkadot": icon1,
	"Scalable and Efficient": icon2,
	"Privacy and Ownership": icon3,
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
								<Heading4 className={styles.caption} Component="h3" lighten={90} weight="semi-bold">
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
