import classNames from "classnames";
import styles from "./Default.module.scss";
import { FC, useState } from "react";
import { Body1, Body2 } from "../../../../ui/typography/Typography";
import { NAME } from "../../../../const/const";
import { Button } from "../../../../ui/button";
import { getConvertedAmount } from "../../utils/converted-amount";

type DefaultType = {
	onClaim(): void;
	onStake(): void;
	onUnStake(): void;
};

export const Default: FC<DefaultType> = ({ onClaim, onStake, onUnStake }) => {
	const currency = "LPT";

	const [percentage, setPercentage] = useState<number>(100);
	const [option, setOption] = useState<number>(0);
	const [totalStake, setTotalStake] = useState<number>(0);
	const [totalRewards, setTotalRewards] = useState<number>(0);

	const [stake, setStake] = useState<number>(0);
	const [balance, setBalance] = useState<number>(0);

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
