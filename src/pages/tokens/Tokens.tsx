import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Tokens.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import { useControlPopUp } from "../../ui/pop-up-container";
import { readUserInformation } from "../../api/user";
import { Loading } from "../../modules/loading";
import { Oops } from "./ui/oops";
import { Flow } from "../../modules/flow";
import { defineFlow } from "../../modules/flow/definition";
import { Step1 } from "./ui/step1";
import { useWeb3React } from "@web3-react/core";

type TokensType = {};

const STEPS = defineFlow(Step1);

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
						{userInformation && (
							<div>
								{userInformation.email ? (
									<Flow steps={STEPS} onComplete={() => alert("Finish")}>
										{(body) => body}
									</Flow>
								) : (
									<Oops />
								)}
							</div>
						)}
					</div>
				</GutterBox>
			</section>
		</>
	);
};
