import React, { FC, useCallback, useEffect, useState } from "react";
import { claimTokens, useContract, getMyClaim } from "../../../../web3/airdrop-contract";
import { useWeb3React } from "@web3-react/core";
import { useWeb3Provider } from "../../../../web3/web3";
import { Loading } from "../../../../modules/loading";
import { Claimed } from "./Claimed";
import { ClaimedFail } from "./ClaimedFail";
import { Contract } from "web3-eth-contract";
import { Claim } from "./Claim";

type StepType = {
	userInfo: { address: string; signature: string };
};

type KNOWN_OPERATIONS = "" | "claim" | "claimed" | "fail-to-claim";

const fetchInformation = async (contract: Contract, ethereumAddress: string) => {
	return await getMyClaim(contract, ethereumAddress);
};

export const Step: FC<StepType> = ({ userInfo }) => {
	const amount = 20;
	const [myClaim, setMyClaim] = useState<boolean>(false);

	const provider = useWeb3Provider();
	const { active } = useWeb3React();
	const contract = useContract(provider);

	const updateData = useCallback(async () => {
		const myClaim = await fetchInformation(contract, userInfo.address);

		setMyClaim(myClaim);
	}, []);

	useEffect(() => {
		const tm = setInterval(updateData, 60000);
		return () => clearInterval(tm);
	}, [contract]);

	useEffect(() => {
		if (active) {
			updateData();
		}
	}, [active]);

	const [operation, setOperation] = useState<KNOWN_OPERATIONS>("");

	const cancelAction = () => {
		setOperation("");
	};

	const claimAction = async () => {
		try {
			setOperation("claim");
			const claimResult = await claimTokens(contract, userInfo.address, userInfo.signature);
			console.log(claimResult);
			setOperation("claimed");
		} catch (e) {
			console.error(e);
			setOperation("fail-to-claim");
		} finally {
			// close modal
		}
	};

	switch (operation) {
		case "":
			return (
				<Claim
					amount={amount}
					ethAddress={userInfo.address}
					disabled={myClaim}
					onClick={claimAction}
				/>
			);

		case "claim":
			return <Loading headline="Awaiting confirmation..." />;

		case "claimed":
			return <Claimed amount={amount} onClick={cancelAction} />;

		case "fail-to-claim":
			return <ClaimedFail cancelClick={cancelAction} tryClick={claimAction} />;
	}
};
