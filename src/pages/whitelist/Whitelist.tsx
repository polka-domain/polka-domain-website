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
import { Closed } from "./ui/closed";
import { Contract } from "web3-eth-contract";
import { getTimeInfo, useContract } from "../../web3/contract";
import { useWeb3Provider } from "../../web3/web3";

type WhitelistType = {};

const fetchInformation = async (contract: Contract) => {
	return await getTimeInfo(contract);
};

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

	const [closeTime, setCloseTime] = useState<number>(0);

	const provider = useWeb3Provider();
	const contract = useContract(provider);

	const updateData = async () => {
		if (active) {
			const timeInfo = await fetchInformation(contract);
			setCloseTime(+timeInfo.openAt);

			console.log(timeInfo);
		}
	};

	useEffect(() => {
		const tm = setInterval(updateData, 60000);
		return () => clearInterval(tm);
	}, [contract]);

	useEffect(() => {
		if (active) {
			updateData();
		}
	}, [active]);

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
								) : whitelistOpened === false || Date.now() >= closeTime * 1000 ? (
									<Closed />
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
