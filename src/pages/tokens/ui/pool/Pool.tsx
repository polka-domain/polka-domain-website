import React, { FC, useCallback, useEffect, useState } from "react";
import { Auction } from "../auction";
import { Button } from "../../../../ui/button";
import { AuctionType, StatusType } from "../auction/Auction";
import {
	claimTokens,
	getMyAmount,
	getMyBalance,
	getMyClaim,
	getMyWhitelisted,
	getTimeInfo,
	getTokenInfo,
	swapContracts,
	TimeInfoType,
	TokenInfo,
	useContract,
} from "../../../../web3/auction-contract";
import { useWeb3React } from "@web3-react/core";
import { useWeb3, useWeb3Provider } from "../../../../web3/web3";
import { fromWei, toBN } from "web3-utils";
import { Loading } from "../../../../modules/loading";
import { Timer } from "../../../../modules/timer";
import { getDeltaTime } from "../../../../utils/page/time";
import styles from "./Pool.module.scss";
import { Confirm } from "./Confirm";
import { Joined } from "./Joined";
import { JoinedFail } from "./JoinedFail";
import { Claimed } from "./Claimed";
import { ClaimedFail } from "./ClaimedFail";
import { Counter } from "./Counter";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { Oops } from "./Oops";
import { NAME } from "../../../../const/const";

type KNOWN_OPERATIONS =
	| ""
	| "fail-whitelisted"
	| "confirm"
	| "join"
	| "joined"
	| "fail-to-join"
	| "claim"
	| "claimed"
	| "fail-to-claim";

const fetchInformation = async (contract: Contract, web3: Web3, ethereumAddress: string) => {
	const pTimeInfo = getTimeInfo(contract);
	const pTokenInfo = getTokenInfo(contract);
	const pMyAmount = getMyAmount(contract, ethereumAddress);
	const pMyClaim = getMyClaim(contract, ethereumAddress);
	const pMyWhitelisted = getMyWhitelisted(contract, ethereumAddress);
	const pBalance = getMyBalance(web3, ethereumAddress);
	const [timeInfo, tokenInfo, myAmount, myClaim, myWhitelisted, balance] = await Promise.all([
		pTimeInfo,
		pTokenInfo,
		pMyAmount,
		pMyClaim,
		pMyWhitelisted,
		pBalance,
	]);
	return {
		timeInfo,
		tokenInfo,
		myAmount,
		myClaim,
		myWhitelisted,
		balance,
	};
};

const deriveStatus = (tokenInfo: TokenInfo, timeInfo: TimeInfoType): StatusType => {
	const filled = tokenInfo.amountTotal1 === tokenInfo.amountSwap1;
	const expired = getDeltaTime(timeInfo.closeAt) === 0;

	if (filled) {
		return "filled";
	}
	if (expired) {
		return "closed";
	}
	return Date.now() < timeInfo.openAt * 1000 ? "coming" : "live";
};

const doNothing = () => {};

export const Pool: FC = () => {
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
	const [myWhitelisted, setMyWhitelisted] = useState<boolean>(false);
	const [myClaim, setMyClaim] = useState<boolean>(false);
	const [myAmount, setMyAmount] = useState<string>("");
	const [claimTime, setClaimTime] = useState<number>(0);
	const [ethBalance, setEthBalance] = useState("0");

	const provider = useWeb3Provider();
	const { active, account: ethereumAddress } = useWeb3React();
	const web3 = useWeb3();
	const contract = useContract(provider);

	const minAllocation = "0.0001";

	const updateData = useCallback(async () => {
		if (!contract) {
			return;
		}
		const {
			timeInfo,
			tokenInfo,
			myAmount,
			myClaim,
			myWhitelisted,
			balance,
		} = await fetchInformation(contract, web3, ethereumAddress);

		const totalAmount0 = toBN(tokenInfo.amountTotal0);
		const totalAmount1 = toBN(tokenInfo.amountTotal1);

		const auction = {
			status: deriveStatus(tokenInfo, timeInfo),
			start: timeInfo.openAt,
			end: timeInfo.closeAt,
			ethereumAddress: tokenInfo.creator,
			range: `${totalAmount0.div(totalAmount1)} ${NAME} = 1 ETH`,
			minAllocation: minAllocation,
			maxAllocation: fromWei(tokenInfo.maxAllocToken1),
			total: fromWei(tokenInfo.amountTotal0),
			amount: fromWei(tokenInfo.amountSwap0),
			totalAmount: fromWei(tokenInfo.amountTotal0),
		};

		console.log(timeInfo);
		console.log(tokenInfo);

		setMyAmount(fromWei(myAmount));
		setMyClaim(myClaim);
		setMyWhitelisted(myWhitelisted);
		setClaimTime(timeInfo.claimAt);
		setAuctionState(auction);
		setEthBalance(balance);

		return {
			myAmount,
			auction,
		};
	}, [contract, ethereumAddress, web3]);

	const onRequestData = auctionState.status ? updateData : doNothing;

	useEffect(() => {
		const tm = setInterval(updateData, 60000);
		return () => clearInterval(tm);
	}, [updateData]);

	useEffect(() => {
		if (active) {
			updateData();
		}
	}, [active]);

	const [operation, setOperation] = useState<KNOWN_OPERATIONS>("");

	const cancelAction = () => {
		setOperation("");
	};

	const joinAction = () => {
		if (myWhitelisted) {
			setOperation("confirm");
		} else setOperation("fail-whitelisted");
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
		const claimStatus = (() => {
			if (myAmount === "0") {
				return "did-not-participate";
			}
			if (myClaim) {
				return "claimed";
			}
			if (Date.now() < claimTime * 1000) {
				return "wait";
			}
			if (!(myClaim || myAmount === "0")) {
				return "claim";
			}
			return "unknown";
		})();

		const settings = {
			size: "large" as any,
			color: "pink" as any,
			variant: "contained" as any,
		};

		const ClaimTimer = (
			<>
				Claim tokens
				<span>
					<Timer timer={claimTime} onZero={onRequestData} />
				</span>
			</>
		);

		switch (auctionState.status) {
			case "":
				return (
					<Button {...settings} disabled>
						Initializing
					</Button>
				);
			case "closed":
				return (
					<Button
						{...settings}
						className={styles.claim}
						onClick={claimAction}
						disabled={claimStatus !== "claim"}
					>
						{claimStatus === "claim" && "Claim Tokens"}
						{claimStatus === "claimed" && "Tokens Claimed"}
						{claimStatus === "did-not-participate" && "Auction Ended"}
						{claimStatus === "wait" && ClaimTimer}
					</Button>
				);
			case "filled":
				return (
					<Button
						{...settings}
						className={styles.claim}
						onClick={claimAction}
						disabled={claimStatus !== "claim"}
					>
						{claimStatus === "claim" && "Claim Tokens"}
						{claimStatus === "claimed" && "Tokens Claimed"}
						{claimStatus === "did-not-participate" && "Auction Ended"}
						{claimStatus === "wait" && ClaimTimer}
					</Button>
				);
			case "coming":
				return (
					<Button {...settings} disabled>
						Join Auction
					</Button>
				);
			default:
				return (
					<Button
						{...settings}
						className={styles.claim}
						onClick={joinAction}
						disabled={claimStatus !== "did-not-participate"}
					>
						{claimStatus === "did-not-participate" ? "Join Auction" : ClaimTimer}
					</Button>
				);
		}
	})();

	switch (operation) {
		case "":
			if (!active) {
				return <></>;
			}
			if (!auctionState.status) {
				return <Loading />;
			}
			if (Date.now() < auctionState.start * 1000) {
				return <Counter time={<Timer timer={auctionState.start} onZero={onRequestData} />} />;
			}
			return (
				<Auction {...auctionState} requireUpdate={onRequestData}>
					{action}
				</Auction>
			);

		case "fail-whitelisted":
			return <Oops onClick={cancelAction} />;

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
			return <Joined amount={myAmount} onClick={cancelAction} />;

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
