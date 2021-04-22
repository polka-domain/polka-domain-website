import classNames from "classnames";
import styles from "./Stake.module.scss";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Header } from "../header";
import { Content } from "../content";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Form, FormSpy, FormProps } from "react-final-form";
import { composeValidators, isDecimalNumber, isRequired } from "../../../../utils/page/validation";
import { Body3 } from "../../../../ui/typography";
import { getConvertedAmount } from "../../utils/converted-amount";
import { FailedPopUp } from "../failed";
import { SuccessPopUp } from "../success";
import { useControlPopUp } from "../../../../ui/pop-up-container";
import { Spinner } from "../../../../ui/spinner";
import { getBalanceInfo, stake, useContract } from "../../../../web3/farms-contract";
import {
	approve,
	getApprovedAmount,
	getMyBalance,
	useContract as useLpContract,
} from "../../../../web3/lp-contract";
import { useWeb3Provider } from "../../../../web3/web3";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "web3-eth-contract";
import BigNumber from "bn.js";
import { fromWei, toWei } from "web3-utils";

enum OPERATION {
	default = "",
	loading = "loading",
	approved = "approved",
	approvalFailed = "approved-failed",
	completed = "completed",
	failed = "failed",
}

const fetchInformation = async (
	contract: Contract,
	lpContract: Contract,
	account: string,
	chainId: number
) => {
	const pApprovedAmount = getApprovedAmount(lpContract, account, chainId);
	const pBalance = getMyBalance(lpContract, account);
	const pStakedAmount = getBalanceInfo(contract, account);

	const [approvedAmount, balance, stakedAmount] = await Promise.all([
		pApprovedAmount,
		pBalance,
		pStakedAmount,
	]);
	return {
		approvedAmount,
		balance,
		stakedAmount,
	};
};

export const Stake: FC<{ onBack(): void }> = ({ onBack }) => {
	const [approvedAmount, setApprovedAmount] = useState<string>("0");
	const [balance, setBalance] = useState<string>("0");
	const [stakedAmount, setStakedAmount] = useState<string>("0");

	const [operation, setOperation] = useState<OPERATION>(OPERATION.default);

	const provider = useWeb3Provider();
	const { active, account, chainId } = useWeb3React();
	const contract = useContract(provider, chainId);
	const lpContract = useLpContract(provider, chainId);

	const updateData = useCallback(async () => {
		if (!lpContract) {
			return;
		}
		if (!contract) {
			return;
		}
		try {
			const { approvedAmount, balance, stakedAmount } = await fetchInformation(
				contract,
				lpContract,
				account,
				chainId
			);

			setApprovedAmount(approvedAmount);
			setBalance(fromWei(balance));
			setStakedAmount(fromWei(stakedAmount));
		} catch (e) {
			console.error("failed to update data", e);
		}
	}, [lpContract, contract, account, chainId]);

	useEffect(() => {
		const tm = setInterval(updateData, 60000);
		return () => clearInterval(tm);
	}, [contract, updateData]);

	useEffect(() => {
		if (active) {
			updateData();
		}
	}, [active, updateData]);

	//approve

	const { popUp: approvedPopUp, close: approvedClose, open: approvedOpen } = useControlPopUp();

	useEffect(() => {
		if (operation === OPERATION.approved) {
			approvedOpen();
		}
	}, [approvedOpen, operation]);

	//approve failed

	const {
		popUp: approvalFailedPopUp,
		close: approvalFailedClose,
		open: approvalFailedOpen,
	} = useControlPopUp();

	useEffect(() => {
		if (operation === OPERATION.approvalFailed) {
			approvalFailedOpen();
		}
	}, [approvalFailedOpen, operation]);

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

	//form

	const [value, setValue] = useState<string | undefined>(undefined);

	const amountIsApproved = value
		? new BigNumber(toWei(value)).lte(new BigNumber(approvedAmount))
		: false;
	const amountIsNotApproved = !amountIsApproved;

	//actions

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
				console.error("failed to stake", e);
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

	const tryAgainAction = () => {
		if (lastOperation) {
			lastOperation();
		}
	};

	const approveAction = async () => {
		try {
			setOperation(OPERATION.loading);
			const approveResult = await approve(lpContract, value, account, chainId);
			console.log(approveResult);
			await updateData();
			setOperation(OPERATION.completed);
		} catch (e) {
			console.error("failed to approve", e);
			setOperation(OPERATION.failed);
		} finally {
			// close modal
		}
	};

	return (
		<>
			<div className={styles.component}>
				<Header title="Stake LPT" onBack={onBack} />
				<Content className={styles.content}>
					<Form
						noValidate
						onSubmit={stakeAction}
						render={({ handleSubmit, form }) => (
							<form className={styles.form} onSubmit={handleSubmit} noValidate>
								<Input
									className={classNames(styles.input, styles.full)}
									name="amount"
									label={
										<p className={styles.label}>
											Amount <span>Balance: {balance} LPT</span>
										</p>
									}
									type="text"
									required
									placeholder="Enter Amount"
									validate={composeValidators(isRequired, isDecimalNumber)}
									initialValue={value && value !== undefined && value}
									after={
										// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
										<span
											className={styles.max}
											onClick={() => {
												form.change("amount", balance);
											}}
										>
											Max
										</span>
									}
									value={value}
								/>
								<FormSpy
									subscription={{ values: true }}
									onChange={({ values }) => setValue(values.amount)}
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
									disabled={value === undefined}
									submit={value !== undefined && amountIsApproved}
									onClick={value !== undefined && amountIsNotApproved ? approveAction : undefined}
								>
									{(operation === OPERATION.loading || value === undefined) && (
										<Spinner className={styles.spinner} color="white" size="small" />
									)}
									{value !== undefined && amountIsApproved && "Stake LPT"}
									{value !== undefined &&
										amountIsNotApproved &&
										(operation === OPERATION.loading ? "Approving" : "Approve")}
								</Button>
							</form>
						)}
					/>
				</Content>
			</div>
			{approvalFailedPopUp.defined ? (
				<FailedPopUp
					control={approvalFailedPopUp}
					close={approvalFailedClose}
					onClick={approveAction}
				/>
			) : null}
			{approvedPopUp.defined ? (
				<SuccessPopUp
					control={approvedPopUp}
					close={approvedClose}
					text="You've successfully approved LPT"
				/>
			) : null}
			{failedPopUp.defined ? (
				<FailedPopUp control={failedPopUp} close={failedClose} onClick={tryAgainAction} />
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
