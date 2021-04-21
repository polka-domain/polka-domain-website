import classNames from "classnames";
import styles from "./Stake.module.scss";
import React, { FC, useEffect, useState } from "react";
import { Header } from "../header";
import { Content } from "../content";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Form } from "react-final-form";
import { isRequired } from "../../../../utils/page/validation";
import { Body3 } from "../../../../ui/typography";
import { getConvertedAmount } from "../../utils/converted-amount";
import { FailedPopUp } from "../failed";
import { SuccessPopUp } from "../success";
import { useControlPopUp } from "../../../../ui/pop-up-container";
import { Spinner } from "../../../../ui/spinner";

enum OPERATION {
	default = "",
	loading = "loading",
	completed = "completed",
	failed = "failed",
}

export const Stake: FC<{ onBack(): void }> = ({ onBack }) => {
	const [balance, setBalance] = useState<number>(100);
	const [stakedAmount, setStakedAmount] = useState<number>(100);

	const [operation, setOperation] = useState<OPERATION>(OPERATION.default);

	const stakeAction = async () => {
		try {
			setOperation(OPERATION.loading);
			// const claimResult = await claimTokens(contract, userInfo.address, userInfo.signature);
			// console.log(claimResult);

			setTimeout(() => setOperation(OPERATION.completed), 10000);
		} catch (e) {
			// console.error(e);
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
									validate={isRequired}
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
				<FailedPopUp control={failedPopUp} close={failedClose} onClick={stakeAction} />
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
