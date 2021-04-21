import classNames from "classnames";
import styles from "./Stake.module.scss";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Header } from "../header";
import { Content } from "../content";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Form, FormProps } from "react-final-form";
import { composeValidators, isDecimalNumber, isRequired } from "../../../../utils/page/validation";
import { Body3 } from "../../../../ui/typography";
import { getConvertedAmount } from "../../utils/converted-amount";
import { FailedPopUp } from "../failed";
import { SuccessPopUp } from "../success";
import { useControlPopUp } from "../../../../ui/pop-up-container";
import { Spinner } from "../../../../ui/spinner";
import { getStakeAddress, stake, useContract } from "../../../../web3/farms-contract";
import {
	getApproval,
	getLPAddress,
	useContract as useLpContract,
} from "../../../../web3/lp-contract";
import { useWeb3, useWeb3Provider } from "../../../../web3/web3";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "web3-eth-contract";
import { getMyClaim } from "../../../../web3/airdrop-contract";
import { chains } from "ethereumjs-common/dist/chains";

enum OPERATION {
	default = "",
	loading = "loading",
	completed = "completed",
	failed = "failed",
}

const fetchInformation = async (contract: Contract, ethereumAddress: string, chainId: number) => {
	return await getApproval(contract, ethereumAddress, chainId);
};

export const Stake: FC<{ onBack(): void }> = ({ onBack }) => {
	const [approved, setApproved] = useState<boolean>(false);
	const [balance, setBalance] = useState<number>(100);
	const [stakedAmount, setStakedAmount] = useState<number>(100);

	const [operation, setOperation] = useState<OPERATION>(OPERATION.default);

	const provider = useWeb3Provider();
	const { active, account, chainId } = useWeb3React();
	const contract = useContract(provider, chainId);
	const lpContract = useLpContract(provider, chainId);

	const updateData = useCallback(async () => {
		const myApproval = await fetchInformation(lpContract, account, chainId);

		setApproved(myApproval);
	}, [lpContract, chainId, contract]);

	useEffect(() => {
		const tm = setInterval(updateData, 60000);
		return () => clearInterval(tm);
	}, [contract, updateData]);

	useEffect(() => {
		if (active) {
			updateData();
		}
	}, [active, updateData]);

	const [lastOperation, setLastOperation] = useState<(() => void) | null>(null);

	const stakeAction: FormProps["onSubmit"] = async (values) => {
		const operation = async () => {
			try {
				setOperation(OPERATION.loading);
				const stakeResult = await stake(contract, values.amount, account);
				console.log(stakeResult);
				setOperation(OPERATION.completed);
				setLastOperation(null);
			} catch (e) {
				console.error(e);
				setOperation(OPERATION.failed);
				return {
					// report to final form
					error: "error",
				};
			} finally {
				// close modal
			}
		};
		setLastOperation(() => operation);
		return operation();
	};

	const tryAgain = () => {
		if (lastOperation) {
			lastOperation();
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
		} else {
			failedClose();
		}
	}, [operation, failedOpen, failedClose]);

	return (
		<>
			<div className={styles.component}>
				<Header title="Stake LPT" onBack={onBack} />
				<Content className={styles.content}>
					<Form
						noValidate
						onSubmit={stakeAction}
						render={({ handleSubmit }) => (
							<form className={styles.form} onSubmit={handleSubmit} noValidate>
								<Input
									className={classNames(styles.input, styles.full)}
									name="amount"
									label={
										<p className={styles.label}>
											Amount <span>Balance: {balance} NAMES</span>
										</p>
									}
									type="text"
									required
									placeholder="Enter Amount"
									validate={composeValidators(isRequired, isDecimalNumber)}
									after={
										<Body3 className={styles.max} Component="span" color="pink">
											Max
										</Body3>
									}
								/>
								<dl className={styles.list}>
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
									disabled={!approved}
									submit
								>
									{operation === OPERATION.loading && (
										<Spinner className={styles.spinner} color="white" size="small" />
									)}
									Stake LPT
								</Button>
							</form>
						)}
					/>
				</Content>
			</div>
			{failedPopUp.defined ? (
				<FailedPopUp control={failedPopUp} close={failedClose} onClick={tryAgain} />
			) : null}
			{successPopUp.defined ? (
				<SuccessPopUp
					control={successPopUp}
					close={successClose}
					text="You've successfully staked LPT"
				/>
			) : null}
		</>
	);
};
