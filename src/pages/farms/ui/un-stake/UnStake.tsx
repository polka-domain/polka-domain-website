import classNames from "classnames";
import styles from "./UnStake.module.scss";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Header } from "../header";
import { Content } from "../content";
import { Button } from "../../../../ui/button";
import { Body3 } from "../../../../ui/typography";
import { getConvertedAmount } from "../../utils/converted-amount";
import { FailedPopUp } from "../failed";
import { SuccessPopUp } from "../success";
import { useControlPopUp } from "../../../../ui/pop-up-container";
import { Spinner } from "../../../../ui/spinner";
import { Contract } from "web3-eth-contract";
import { getBalanceInfo, useContract, withdraw } from "../../../../web3/farms-contract";
import { useWeb3Provider } from "../../../../web3/web3";
import { useWeb3React } from "@web3-react/core";
import { fromWei } from "web3-utils";

enum OPERATION {
	default = "",
	loading = "loading",
	completed = "completed",
	failed = "failed",
}

const fetchInformation = async (contract: Contract, account: string) => {
	const pStakedAmount = getBalanceInfo(contract, account);

	const [stakedAmount] = await Promise.all([pStakedAmount]);
	return {
		stakedAmount,
	};
};

export const UnStake: FC<{ onBack(): void }> = ({ onBack }) => {
	const [unclaimedAmount, setUnclaimedAmount] = useState<string>("0");
	const [stakedAmount, setStakedAmount] = useState<string>("0");

	const provider = useWeb3Provider();
	const { active, account, chainId } = useWeb3React();
	const contract = useContract(provider, chainId);

	const updateData = useCallback(async () => {
		if (!contract) {
			return;
		}
		try {
			const { stakedAmount } = await fetchInformation(contract, account);

			setStakedAmount(fromWei(stakedAmount));
		} catch (e) {
			console.error("failed to update data", e);
		}
	}, [contract, account]);

	useEffect(() => {
		const tm = setInterval(updateData, 60000);
		return () => clearInterval(tm);
	}, [contract, updateData]);

	useEffect(() => {
		if (active) {
			updateData();
		}
	}, [active, updateData]);

	const [operation, setOperation] = useState<OPERATION>(OPERATION.default);

	const unStakeAction = async () => {
		try {
			setOperation(OPERATION.loading);
			const unStakeResult = await withdraw(contract, unclaimedAmount, account);
			console.log(unStakeResult);
			setOperation(OPERATION.completed);
		} catch (e) {
			console.error(e);
			setOperation(OPERATION.failed);
		} finally {
			// close modal
		}
	};

	//success

	const { popUp: successPopUp, close: successClose, open: successOpen } = useControlPopUp();

	useEffect(() => {
		if (operation === OPERATION.completed) {
			successOpen();
		}
	}, [successOpen, operation]);

	//failed
	const { popUp: failedPopUp, close: failedClose, open: failedOpen } = useControlPopUp();

	useEffect(() => {
		if (operation === OPERATION.failed) {
			failedOpen();
		}
	}, [operation, failedOpen]);

	return (
		<>
			<div className={styles.component}>
				<Header title="Unstake LPT" onBack={onBack} />
				<Content className={styles.content}>
					<dl className={styles.list}>
						<Body3 className={styles.term} Component="dt" weight="medium">
							Unclaimed +MATTER($1)
						</Body3>
						<Body3 className={styles.description} Component="dd" weight="medium" lighten={80}>
							<span>{getConvertedAmount(unclaimedAmount)}</span> NAMES
						</Body3>
						<Body3 className={styles.term} Component="dt" weight="medium">
							LPT Staked
						</Body3>
						<Body3 className={styles.description} Component="dd" weight="medium" lighten={80}>
							<span>{getConvertedAmount(stakedAmount)}</span> LPT
						</Body3>
					</dl>
					<Button
						className={styles.button}
						variant="contained"
						color="pink"
						size="large"
						onClick={unStakeAction}
					>
						{operation === OPERATION.loading && (
							<Spinner className={styles.spinner} color="white" size="small" />
						)}
						Unstake LPT
					</Button>
				</Content>
			</div>
			{failedPopUp.defined ? (
				<FailedPopUp control={failedPopUp} close={failedClose} onClick={unStakeAction} />
			) : null}
			{successPopUp.defined ? (
				<SuccessPopUp
					control={successPopUp}
					close={successClose}
					text="You've successfully unstaked LPT"
				/>
			) : null}
		</>
	);
};
