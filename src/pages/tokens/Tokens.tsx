import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Tokens.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import { readUserInformation } from "../../api/user";
import { Loading } from "../../modules/loading";
import { Oops } from "./ui/oops";
import { Pool } from "./ui/pool";
import { useWeb3React } from "@web3-react/core";

type TokensType = {};

export const Tokens: FC<TokensType> = () => {
	const { active, account: ethereumAddress } = useWeb3React();

	const [userInformation, setUserInformation] = useState(undefined);

	useEffect(() => {
		if (ethereumAddress) {
			readUserInformation(ethereumAddress).then((info) => setUserInformation(info));
		}
	}, [ethereumAddress]);

	return (
		<>
			<section className={styles.component}>
				<GutterBox className={styles.gutter}>
					<div className={classNames(styles.wrapper, getModeClassName("light", theme))}>
						{active && !userInformation && <Loading />}
						{userInformation && <div>{userInformation.email ? <Pool /> : <Oops />}</div>}
					</div>
				</GutterBox>
			</section>
		</>
	);
};
