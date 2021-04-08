import React, { CSSProperties, FC, useEffect, useState } from "react";
import styles from "./Auction.module.scss";
import { Box } from "../../../../modules/box/Box";
import { walletConversion } from "../../../../utils/page/convertWallet";
import { WithChildren } from "../../../../helper/react/types";
import { Body2 } from "../../../../ui/typography/Typography";
import CopyToClipboard from "react-copy-to-clipboard";
import { CopyIcon } from "../../../../ui/icons/Icons";

type StatusType = "live" | "filled";

const STATUS_CAPTION: Record<StatusType, string> = {
	live: "Live",
	filled: "Filled",
};

type AuctionType = Partial<{
	status: StatusType;
	timer: string;
	ethereumAddress: string;
	range: string;
	minAllocation: number;
	maxAllocation: number;
	total: number;
	amount: number;
	totalAmount: number;
}>;

export const Auction: FC<AuctionType & WithChildren> = ({
	status = "filled",
	timer = "0d : 32h : 12m : 10s",
	ethereumAddress = "0xD169687D85D95880feC3cBfAE61a54C1a8B92345",
	range = "0000 NAME = 0 ETH",
	minAllocation = 0.0001,
	maxAllocation = 0.0001,
	total = 0.00045,
	amount = 300,
	totalAmount = 1000,
	children,
}) => {
	const percentage = ((amount / totalAmount) * 100).toFixed(0);

	const [isCopy, setCopy] = useState<boolean>(false);

	useEffect(() => {
		if (isCopy) {
			setTimeout(() => setCopy(false), 1000);
		}
	}, [isCopy]);

	return (
		<Box
			className={styles.component}
			size="lg"
			style={
				{
					"--bar-width": `${percentage}%`,
					"--color": status === "live" ? "var(--success)" : "var(--announce)",
				} as CSSProperties
			}
		>
			<div className={styles.header}>
				<h2 className={styles.title}>Polka.Domain Auction</h2>
				<span className={styles.status}>{STATUS_CAPTION[status]}</span>
				<span className={styles.timer}>{timer}</span>
				<CopyToClipboard text={ethereumAddress} onCopy={() => setCopy(true)}>
					<Body2 Component="p" className={styles.wallet} lighten={40}>
						{walletConversion(ethereumAddress)}
						<CopyIcon className={styles.copy} />
					</Body2>
				</CopyToClipboard>
			</div>
			<div className={styles.body}>
				<p className={styles.range}>{range}</p>
				<ul className={styles.list}>
					<li className={styles.item}>
						Min Allocation
						<span>{minAllocation} ETH</span>
					</li>
					<li className={styles.item}>
						Max Allocation
						<span>{maxAllocation} ETH</span>
					</li>
					<li className={styles.item}>
						Total Supply
						<span>{total} ETH</span>
					</li>
				</ul>
				<div className={styles.progress}>
					Auction Progress
					<div className={styles.bar} />
					<Body2 className={styles.info}>
						<span>{percentage} %</span>{" "}
						<span>
							{amount} ETH / {totalAmount} ETH
						</span>
					</Body2>
				</div>
				<div className={styles.action}>{children}</div>
			</div>
		</Box>
	);
};