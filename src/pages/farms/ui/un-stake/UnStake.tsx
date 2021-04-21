import classNames from "classnames";
import styles from "./UnStake.module.scss";
import React, { FC, useEffect, useState } from "react";
import { Header } from "../header";
import { Content } from "../content";
import { Button } from "../../../../ui/button";
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

export const UnStake: FC<{ onBack(): void }> = ({ onBack }) => {
	const [unclaimedAmount, setUnclaimedAmount] = useState<number>(0);
	const [stakedAmount, setStakedAmount] = useState<number>(0);

	const [operation, setOperation] = useState<OPERATION>(OPERATION.default);

	const unStakeAction = async () => {
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
