import React, { FC, useEffect, useState } from "react";
import { Auction } from "../auction";
import { Button } from "../../../../ui/button";
import { AuctionType, StatusType } from "../auction/Auction";
import {
	claimTokens,
	getMyAmount,
	getMyBalance,
	getMyClaim,
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
import { Confirm } from "./Confirm";
import { Joined } from "./Joined";
import { JoinedFail } from "./JoinedFail";
import { Claimed } from "./Claimed";
import { ClaimedFail } from "./ClaimedFail";

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
		start: 0,
		end: 0,
		ethereumAddress: "",
		range: "",
		minAllocation: "",
		maxAllocation: "",
		total: "",
		amount: "",
		totalAmount: "",
	});
	const [myClaim, setMyClaim] = useState<boolean>(false);
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
		const pMyClaim = getMyClaim(contract, ethereumAddress);
		const pBalance = getMyBalance(web3, ethereumAddress);
		const [timeInfo, tokenInfo, myAmount, myClaim, balance] = await Promise.all([
			pTimeInfo,
			pTokenInfo,
			pMyAmount,
			pMyClaim,
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
					: Date.now() < timeInfo.closeAt * 1000
					? "coming"
					: ("live" as StatusType),
			start: timeInfo.openAt,
			end: timeInfo.closeAt,
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
		setMyClaim(myClaim);
		setClaimTime(claimTime);
		setAuctionState(auction);
		setEthBalance(balance);

		console.log({
			timeInfo,
			tokenInfo,
			myAmount,
			myClaim,
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

	const cancelAction = () => {
		setOperation("");
	};

	const joinAction = () => {
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
			console.error(e);
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
					<Button
						size="large"
						color="pink"
						variant="contained"
						onClick={claimAction}
						disabled={myClaim}
					>
						{myClaim ? "Tokens claimed" : "Claim tokens"}
					</Button>
				);
			case "filled":
				return (
					<Button
						size="large"
						color="pink"
						variant="contained"
						onClick={claimAction}
						disabled={myClaim}
					>
						{myClaim ? "Tokens claimed" : "Claim tokens"}
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
				<Confirm
					balance={fromWei(ethBalance)}
					amount={String(auctionState.maxAllocation)}
					cancelClick={cancelAction}
					confirmClick={contributeAction}
				/>
			);

		case "join":
			return <Loading headline="Awaiting confirmation..." />;

		case "joined":
			return <Joined amount={fromWei(myAmount)} onClick={cancelAction} />;

		case "fail-to-join":
			return <JoinedFail cancelClick={cancelAction} tryClick={contributeAction} />;

		case "claim":
			return <Loading headline="Claiming..." />;

		case "claimed":
			return <Claimed onClick={cancelAction} />;

		case "fail-to-claim":
			return <ClaimedFail cancelClick={cancelAction} tryClick={claimAction} />;
	}
};
