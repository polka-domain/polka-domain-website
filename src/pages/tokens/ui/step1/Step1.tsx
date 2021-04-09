import React, { FC, useEffect, useState } from "react";
import styles from "./Step1.module.scss";
import { defineFlowStep } from "../../../../modules/flow/definition";
import { Auction } from "../auction";
import { Button } from "../../../../ui/button";
import { AuctionType, StatusType } from "../auction/Auction";
import { getTimeInfo, getTokenInfo, swapContracts, useContract } from "../../../../web3/contract";
import { useWeb3React } from "@web3-react/core";
import { useWeb3Provider } from "../../../../web3/web3";
import { getDeltaTime } from "../auction/time";
import { fromWei } from "web3-utils";

export const Step1Base: FC = () => {
	const [auctionState, setAuctionState] = useState<AuctionType>({
		status: "" as any,
		timer: 0,
		ethereumAddress: "",
		range: "",
		minAllocation: 0,
		maxAllocation: 0,
		total: 0,
		amount: 0,
		totalAmount: 0,
	});

	const provider = useWeb3Provider();
	const { account: ethereumAddress } = useWeb3React();
	const contract = useContract(provider);

	const minAllocation = "0.0001";

	const updateData = async () => {
		const pTimeInfo = getTimeInfo(contract);
		const pTokenInfo = getTokenInfo(contract);
		const [timeInfo, tokenInfo] = await Promise.all([pTimeInfo, pTokenInfo]);
		const auction = {
			status:
				tokenInfo.amountTotal1 === tokenInfo.amountSwap1
					? "filled"
					: getDeltaTime(timeInfo.closeAt) === 0
					? "closed"
					: ("live" as StatusType),
			timer: timeInfo.closeAt,
			ethereumAddress: tokenInfo.creator,
			range: `0000 NAME = ${
				parseInt(fromWei(tokenInfo.amountTotal0)) / parseFloat(fromWei(tokenInfo.amountTotal1))
			} ETH`,
			minAllocation: parseFloat(minAllocation),
			maxAllocation: parseFloat(fromWei(tokenInfo.maxAllocToken1)),
			total: 0.00045,
			amount: parseFloat(fromWei(tokenInfo.amountSwap1)),
			totalAmount: parseFloat(fromWei(tokenInfo.amountTotal1)),
		};
		setAuctionState(auction);
		console.log({
			timeInfo,
			tokenInfo,
		});
	};

	useEffect(() => {
		updateData();
	}, [contract]);

	const joinAction = async () => {
		try {
			// startOperation('join');
			await swapContracts(contract, minAllocation, ethereumAddress);
			await updateData();
			// completeOperation('join');
		} catch (e) {
			// failOperation('join');
		} finally {
			// close modal
		}
	};

	return (
		<Auction {...auctionState}>
			{auctionState.status ? (
				<Button size="large" color="pink" variant="contained" onClick={joinAction}>
					Join Auction
				</Button>
			) : (
				<Button size="large" color="pink" variant="contained">
					Initializing
				</Button>
			)}
		</Auction>
	);
};

export const Step1 = defineFlowStep({
	Body: Step1Base,
});
