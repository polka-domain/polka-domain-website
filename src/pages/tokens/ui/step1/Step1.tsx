import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { Auction } from "../auction";
import { Button } from "../../../../ui/button";
import { AuctionType, StatusType } from "../auction/Auction";
import {
	claimTokens,
	getMyAmount,
	getMyBalance,
	getTimeInfo,
	getTokenInfo,
	swapContracts,
	useContract,
} from "../../../../web3/contract";
import { useWeb3React } from "@web3-react/core";
import { useWeb3, useWeb3Provider } from "../../../../web3/web3";
import { fromWei, toBN } from "web3-utils";
import { Loading } from "../../../../modules/loading";
import { Timer } from "../../../../modules/timer";
import { getDeltaTime } from "../../../../utils/page/time";
import styles from "./Step1.module.scss";
import { Box } from "../../../../modules/box";
import { HeadlinePlusSubline } from "../../../../modules/headline-plus-subline";

type KNOWN_OPERATIONS =
	| ""
	| "confirm"
	| "join"
	| "joined"
	| "fail-to-join"
	| "claim"
	| "claimed"
	| "fail-to-claim";

export const Step1: FC = () => {
	const [auctionState, setAuctionState] = useState<AuctionType>({
		status: "" as any,
		timer: 0,
		ethereumAddress: "",
		range: "",
		minAllocation: "",
		maxAllocation: "",
		total: "",
		amount: "",
		totalAmount: "",
	});
	const [myAmount, setMyAmount] = useState<string>("");
	const [claimTime, setClaimTime] = useState<number>(0);
	const [ethBalance, setEthBalance] = useState("0");

	const provider = useWeb3Provider();
	const { account: ethereumAddress } = useWeb3React();
	const web3 = useWeb3();
	const contract = useContract(provider);

	const minAllocation = "0.0001";

	const updateData = async () => {
		const pTimeInfo = getTimeInfo(contract);
		const pTokenInfo = getTokenInfo(contract);
		const pMyAmount = getMyAmount(contract, ethereumAddress);
		const pBalance = getMyBalance(web3, ethereumAddress);
		const [timeInfo, tokenInfo, myAmount, balance] = await Promise.all([
			pTimeInfo,
			pTokenInfo,
			pMyAmount,
			pBalance,
		]);

		const totalAmount0 = toBN(tokenInfo.amountTotal0);
		const totalAmount1 = toBN(tokenInfo.amountTotal1);

		const auction = {
			status:
				tokenInfo.amountTotal1 === tokenInfo.amountSwap1
					? "filled"
					: getDeltaTime(timeInfo.closeAt) === 0
					? "closed"
					: ("live" as StatusType),
			timer: timeInfo.closeAt,
			ethereumAddress: tokenInfo.creator,
			range: `${totalAmount0.div(totalAmount1)} NAME = 1 ETH`,
			minAllocation: minAllocation,
			maxAllocation: fromWei(tokenInfo.maxAllocToken1),
			total: fromWei(tokenInfo.amountTotal1),
			amount: fromWei(tokenInfo.amountSwap1),
			totalAmount: fromWei(tokenInfo.amountTotal1),
		};

		const claimTime = timeInfo.claimAt;

		setMyAmount(fromWei(myAmount));
		setClaimTime(claimTime);
		setAuctionState(auction);
		setEthBalance(balance);

		console.log({
			timeInfo,
			tokenInfo,
			myAmount,
		});
		return {
			myAmount,
			auction,
		};
	};

	useEffect(() => {
		updateData();
	}, [contract]);

	const [operation, setOperation] = useState<KNOWN_OPERATIONS>("");

	const joinAction = async () => {
		setOperation("confirm");
	};

	const contributeAction = async () => {
		try {
			setOperation("join");
			const swapResult = await swapContracts(
				contract,
				String(auctionState.maxAllocation),
				ethereumAddress
			);
			console.log(swapResult);
			await updateData();
			setOperation("joined");
		} catch (e) {
			setOperation("fail-to-join");
		} finally {
			// close modal
		}
	};

	const claimAction = async () => {
		try {
			setOperation("claim");
			const claimResult = await claimTokens(contract, ethereumAddress);
			console.log(claimResult);
			await updateData();
			setOperation("claimed");
		} catch (e) {
			setOperation("fail-to-claim");
		} finally {
			// close modal
		}
	};

	const action = (() => {
		switch (auctionState.status) {
			case "":
				return (
					<Button size="large" color="pink" variant="contained" disabled>
						Initializing
					</Button>
				);
			case "closed":
				return (
					<Button size="large" color="pink" variant="contained" onClick={claimAction}>
						Claim tokens
					</Button>
				);
			case "filled":
				return (
					<Button size="large" color="pink" variant="contained" onClick={claimAction}>
						Claim tokens
					</Button>
				);
			default:
				if (myAmount === "0") {
					return (
						<Button size="large" color="pink" variant="contained" onClick={joinAction}>
							Join Auction
						</Button>
					);
				} else {
					return (
						<Button className={styles.claim} size="large" color="pink" variant="contained" disabled>
							Claim tokens
							<span>
								<Timer timer={claimTime} />
							</span>
						</Button>
					);
				}
		}
	})();

	switch (operation) {
		case "":
			return <Auction {...auctionState}>{action}</Auction>;

		case "confirm":
			return (
				<Box className={styles.box}>
					<p className={styles.contribution}>
						Your Contribution:
						<br />
						<span>{String(auctionState.maxAllocation)} ETH</span>
					</p>
					<p className={styles.text}>Your balance: {fromWei(ethBalance)} ETH</p>
					<div className={classNames(styles.buttons, styles.withOffset)}>
						<Button color="pink" size="large" variant="outlined" onClick={() => setOperation("")}>
							Cancel
						</Button>
						<Button color="pink" size="large" variant="contained" onClick={contributeAction}>
							Contribute
						</Button>
					</div>
				</Box>
			);

		case "join":
			return <Loading headline="Awaiting confirmation..." />;

		case "joined":
			return (
				<Box className={styles.box}>
					<HeadlinePlusSubline
						headline="Success!"
						subline={`You have successfully contributed ${fromWei(myAmount)} ETH 🎉`}
					>
						<Button
							className={styles.button}
							color="pink"
							size="large"
							variant="outlined"
							onClick={() => setOperation("")}
						>
							Back to Auction
						</Button>
					</HeadlinePlusSubline>
				</Box>
			);

		case "fail-to-join":
			return (
				<Box className={styles.box}>
					<HeadlinePlusSubline headline="Oops!" subline="Action failed, please try again 😅">
						<div className={styles.buttons}>
							<Button color="pink" size="large" variant="outlined" onClick={() => setOperation("")}>
								Cancel
							</Button>
							<Button color="pink" size="large" variant="contained" onClick={contributeAction}>
								Try Again
							</Button>
						</div>
					</HeadlinePlusSubline>
				</Box>
			);

		case "claim":
			return <div>claiming....</div>;
		case "claimed":
			return (
				<div>
					claimed <button onClick={() => setOperation("")}>ok </button>
				</div>
			);
		case "fail-to-claim":
			return <div>failed to claim....</div>;
	}
};
