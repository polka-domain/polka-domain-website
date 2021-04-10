import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Whitelist.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { Heading1 } from "../../ui/typography";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import { TextColor } from "../../ui/text-color";
import { Step1 } from "./ui/Step1";
import { Step2 } from "./ui/Step2";
import { YouAreIn } from "./ui/you-are-in";
import { readUserInformation } from "../../api/user";
import { Loading } from "../../modules/loading";
import { useWeb3React } from "@web3-react/core";

type WhitelistType = {};

export const Whitelist: FC<WhitelistType> = () => {
	const { active, account: ethereumAddress } = useWeb3React();

	const [userInformation, setUserInformation] = useState(undefined);

	useEffect(() => {
		if (ethereumAddress) {
			readUserInformation(ethereumAddress).then((info) => setUserInformation(info));
		}
	}, [ethereumAddress]);

	const [success, setSuccess] = useState(false);

	return (
		<>
			<section className={styles.component}>
				<GutterBox className={styles.gutter}>
					<Heading1 className={styles.title}>
						Welcome to Our <TextColor color="pink">Whitelist Lottery</TextColor>,<br />
						Get First Dibs on Polka.Domain
					</Heading1>
					<div className={classNames(styles.wrapper, getModeClassName("light", theme))}>
						{active && !userInformation && <Loading />}
						{userInformation && (
							<div>
								{userInformation.email ? (
									<YouAreIn />
								) : (
									<>
										{!success ? (
											<Step1
												initialEthereumAddress={ethereumAddress}
												nextStep={() => setSuccess(true)}
											/>
										) : (
											<Step2 />
										)}
									</>
								)}
							</div>
						)}
					</div>
				</GutterBox>
			</section>
		</>
	);
};
