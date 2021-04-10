import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Whitelist.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { Heading1 } from "../../ui/typography";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import { TextColor } from "../../ui/text-color";
import { Step1 } from "./ui/step1";
import { Step2 } from "./ui/step2";
import { YouAreIn } from "./ui/you-are-in";
import { readUserInformation, readWhitelistStatus } from "../../api/user";
import { Loading } from "../../modules/loading";
import { useWeb3React } from "@web3-react/core";
import { Close } from "../../ui/icons/Icons";
import { Closed } from "./ui/closed";

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

	const [whitelistOpened, setWhitelistOpened] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		readWhitelistStatus().then(setWhitelistOpened);
	}, []);

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
								) : whitelistOpened !== false ? (
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
								) : (
									<Closed />
								)}
							</div>
						)}
					</div>
				</GutterBox>
			</section>
		</>
	);
};
