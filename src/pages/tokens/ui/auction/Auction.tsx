import React, { CSSProperties, FC, useEffect, useState } from "react";
import styles from "./Auction.module.scss";
import { Box } from "../../../../modules/box";
import { walletConversion } from "../../../../utils/page/convertWallet";
import { WithChildren } from "../../../../helper/react/types";
import { Body2 } from "../../../../ui/typography/Typography";
import CopyToClipboard from "react-copy-to-clipboard";
import { CopyIcon } from "../../../../ui/icons/Icons";
import { Timer } from "../../../../modules/timer";

export type StatusType = "" | "coming" | "live" | "filled" | "closed";

const STATUS_CAPTION: Record<StatusType, string> = {
	"": "-",
	coming: "Coming soon",
	live: "Live",
	filled: "Filled",
	closed: "Closed",
};

export type AuctionType = {
	status: StatusType;
	start: number;
	end: number;
	ethereumAddress: string;
	range: string;
	minAllocation: string;
	maxAllocation: string;
	total: string;
	amount: string;
	totalAmount: string;
};

export const Auction: FC<AuctionType & WithChildren> = ({
	status,
	start,
	end,
	ethereumAddress,
	range,
	minAllocation,
	maxAllocation,
	total,
	amount,
	totalAmount,
	children,
}) => {
	const percentage = ((parseFloat(amount) / parseFloat(totalAmount)) * 100).toFixed(0);

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
					"--color":
						status === "filled"
							? "var(--announce)"
							: status === "live"
							? "var(--success)"
							: "var(--error)",
				} as CSSProperties
			}
		>
			<div className={styles.header}>
				<h2 className={styles.title}>Polka.Domain Auction</h2>
				<span className={styles.status}>{STATUS_CAPTION[status]}</span>
				{status !== "closed" && (
					<span className={styles.timer}>
						{status === "coming" ? <Timer timer={start} /> : <Timer timer={end} />}
					</span>
				)}
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
