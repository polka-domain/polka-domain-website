import React, { FC, useEffect, useState } from "react";
import styles from "./Step1.module.scss";
import { defineFlowStep } from "../../../../modules/flow/definition";
import { Auction } from "../auction";
import { Button } from "../../../../ui/button";
import { AuctionType, StatusType } from "../auction/Auction";
import { getTimeInfo, getTokenInfo, swapContracts, useContract } from "../../../../web3/contract";
import { useWeb3React } from "@web3-react/core";
import { useWeb3Provider } from "../../../../web3/web3";

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

	const updateData = async () => {
		const pTimeInfo = getTimeInfo(contract);
		const pTokenInfo = getTokenInfo(contract);
		const [timeInfo, tokenInfo] = await Promise.all([pTimeInfo, pTokenInfo]);
		const auction = {
			status: tokenInfo.amountTotal1 === tokenInfo.amountSwap1 ? "filled" : ("live" as StatusType),
			timer: timeInfo.closeAt,
			ethereumAddress: tokenInfo.creator,
			range: `0000 NAME = ${
				parseInt(tokenInfo.amountTotal0) / parseInt(tokenInfo.amountTotal1)
			} ETH`,
			minAllocation: 0.0001,
			maxAllocation: parseInt(tokenInfo.maxAllocToken1),
			total: 0.00045,
			amount: parseInt(tokenInfo.amountSwap1),
			totalAmount: parseInt(tokenInfo.amountTotal1),
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
		await swapContracts(contract, "1", ethereumAddress);
		updateData();
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
