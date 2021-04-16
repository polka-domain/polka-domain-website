import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Airdrop.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import { readUserInformation } from "../../api/airdrops";
import { Loading } from "../../modules/loading";
import { useWeb3React } from "@web3-react/core";
import { Step } from "./ui/step";
import { Oops } from "./ui/oops";
import { Counter } from "./ui/step/Counter";
import { Timer } from "../../modules/timer";

type TokensType = {};

export const Airdrop: FC<TokensType> = () => {
	const [airdropStart, setAirdropStart] = useState(false);

	const startTime = +new Date("Fri Apr 16 2021 14:00:00 UTC+00");
	const { active, account: ethereumAddress } = useWeb3React();

	const [userInformation, setUserInformation] = useState(undefined);

	useEffect(() => {
		if (Date.now() >= startTime) {
			setAirdropStart(true);
		}
	}, [startTime]);

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
						{!active ? (
							<></>
						) : (
							<>
								{!airdropStart ? (
									<>
										<Counter
											time={<Timer timer={startTime / 1000} onZero={() => setAirdropStart(true)} />}
										/>
									</>
								) : (
									<>
										{!userInformation && <Loading />}
										{userInformation &&
											(userInformation.address ? <Step userInfo={userInformation} /> : <Oops />)}
									</>
								)}
							</>
						)}
					</div>
				</GutterBox>
			</section>
		</>
	);
};
