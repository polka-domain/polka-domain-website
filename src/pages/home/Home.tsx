import React, { FC } from "react";

import styles from "./Home.module.scss";
import { Features } from "../ui/features";
import { Services } from "../ui/services";
import { Breakline } from "../ui/breakline";
import { Promo } from "../ui/promo";

type HomeType = {};

export const Home: FC<HomeType> = () => {
	return (
		<>
			<Promo />
			<Services />
			<Breakline className={styles.breakline} />
			<Features className={styles.features} />
		</>
	);
};
