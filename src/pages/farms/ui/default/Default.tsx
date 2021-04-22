import classNames from "classnames";
import styles from "./Default.module.scss";
import { FC, useCallback, useEffect, useState } from "react";
import { Body1, Body2 } from "../../../../ui/typography/Typography";
import { NAME } from "../../../../const/const";
import { Button } from "../../../../ui/button";
import { getConvertedAmount } from "../../utils/converted-amount";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import {
	useContract,
	getAPYInfo,
	getRewardInfo,
	getBalanceInfo,
} from "../../../../web3/farms-contract";
import { useWeb3, useWeb3Provider } from "../../../../web3/web3";
import { useWeb3React } from "@web3-react/core";
import { fromWei, toBN, toWei } from "web3-utils";

type DefaultType = {
	onClaim(): void;
	onStake(): void;
	onUnStake(): void;
};

const traceable = <T extends unknown>(name: string, x: Promise<T>): Promise<T> => {
	x.catch((e) => console.error(`${name} failed`, e));
	return x;
};

const fetchInformation = async (contract: Contract, web3: Web3, ethereumAddress: string) => {
	const pAPYInfo = Promise.resolve(42); //traceable("getAPYInfo", getAPYInfo(contract));
	const pReward = traceable("getRewardInfo", getRewardInfo(contract, ethereumAddress));
	const pBalance = traceable("getBalanceInfo", getBalanceInfo(contract, ethereumAddress));

	const [apyInfo, reward, balance] = await Promise.all([pAPYInfo, pReward, pBalance]);
	return {
		apyInfo,
		reward,
		balance,
	};
};

export const Default: FC<DefaultType> = ({ onClaim, onStake, onUnStake }) => {
	const currency = "LPT";

	const [percentage, setPercentage] = useState<number>(0);
	const [option, setOption] = useState<string>("0");
	const [totalStake, setTotalStake] = useState<string>("0");
	const [totalRewards, setTotalRewards] = useState<string>("0");

	const [stake, setStake] = useState<string>("0");
	const [balance, setBalance] = useState<string>("0");

	const provider = useWeb3Provider();
	const { active, account: ethereumAddress, chainId } = useWeb3React();
	const web3 = useWeb3();
	const contract = useContract(provider, chainId);

	const updateData = useCallback(async () => {
		if (!contract) {
			return;
		}
		try {
			const { apyInfo, reward, balance } = await fetchInformation(contract, web3, ethereumAddress);

			setPercentage(apyInfo);
			setOption(fromWei(reward));
			setStake(fromWei(balance));
		} catch (e) {
			console.error("failed to update data", e);
		}
	}, [contract, ethereumAddress, web3]);

	useEffect(() => {
		const tm = setInterval(updateData, 60000);
		return () => clearInterval(tm);
	}, [contract, updateData]);

	useEffect(() => {
		if (active) {
			updateData();
		}
	}, [active, updateData]);

	return (
		<>
			<section className={styles.component}>
				<div className={styles.header}>
					<Body2 className={styles.pool} Component="span" weight="medium" lighten={70}>
						{NAME} Token Pool
					</Body2>
					<Body2 className={styles.percentage} Component="span" lighten={70}>
						APY{" "}
						<Body2 Component="span" lighten={100}>
							{percentage}%
						</Body2>
					</Body2>
				</div>
				<div className={styles.summary}>
					<div className={styles.reward}>
						Your Staking Rewards Estimation
						<Body1 className={styles.option} Component="span" lighten={80} weight="medium">
							<span>{getConvertedAmount(option)}</span> Polka.dot Option Token
						</Body1>
						<Button
							className={styles.claimAction}
							variant="contained"
							color="pink"
							size="large"
							onClick={onClaim}
						>
							Claim Rewards
						</Button>
					</div>
					<dl className={styles.summaryList}>
						<Body2 className={styles.term} Component="dt" lighten={80}>
							Token LPT staked
						</Body2>
						<Body2 className={styles.description} Component="dd" lighten={80}>
							<span>{getConvertedAmount(totalStake)}</span> {currency}
						</Body2>
						<Body2 className={styles.term} Component="dt" lighten={80}>
							Total network rewards per day
						</Body2>
						<Body2 className={styles.description} Component="dd" lighten={80}>
							<span>{getConvertedAmount(totalRewards)}</span> {NAME} Option Token
						</Body2>
					</dl>
				</div>
				<ul className={styles.list}>
					<Body2 Component="li" className={styles.item} weight="bold" lighten={70}>
						Your Stake
						<Body1 className={styles.balance} Component="span" weight="medium" lighten={80}>
							<span>{getConvertedAmount(stake)}</span> {currency}
						</Body1>
						<Button
							className={styles.action}
							variant="outlined"
							color="pink"
							size="medium"
							onClick={onUnStake}
						>
							Unstake {currency}
						</Button>
					</Body2>
					<Body2 Component="li" className={styles.item} weight="bold" lighten={70}>
						Your Balance
						<Body1 className={styles.balance} Component="span" weight="medium" lighten={80}>
							<span>{getConvertedAmount(balance)}</span> {currency}
						</Body1>
						<Button
							className={styles.action}
							variant="outlined"
							color="pink"
							size="medium"
							onClick={onStake}
						>
							Stake {currency}
						</Button>
					</Body2>
				</ul>
			</section>
		</>
	);
};
