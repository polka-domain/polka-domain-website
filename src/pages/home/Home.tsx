import React, { FC } from "react";

import styles from "./Home.module.scss";
import { Features } from "../ui/features";
import { Services } from "../ui/services";
import { Breakline } from "../ui/breakline";
import { Promo } from "../ui/promo/Promo";

type HomeType = {};

export const Home: FC<HomeType> = () => {
	return (
		<>
			<Promo />
			<Services />
			<Breakline />
			<Features />
		</>
	);
};
