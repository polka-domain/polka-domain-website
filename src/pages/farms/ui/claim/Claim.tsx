import classNames from "classnames";
import styles from "./Claim.module.scss";
import { FC, useEffect, useState } from "react";
import { Header } from "../header";
import { getConvertedAmount } from "../../utils/converted-amount";
import { Button } from "../../../../ui/button";
import { Content } from "../content";
import { Body2 } from "../../../../ui/typography/Typography";
import { useControlPopUp } from "../../../../ui/pop-up-container";
import { Spinner } from "../../../../ui/spinner";
import { SuccessPopUp } from "../success";
import { FailedPopUp } from "../failed";

enum OPERATION {
	default = "",
	loading = "loading",
	completed = "completed",
	failed = "failed",
}

export const Claim: FC<{ onBack(): void }> = ({ onBack }) => {
	const [operation, setOperation] = useState<OPERATION>(OPERATION.default);

	const [amount, setAmount] = useState<number>(0);

	const claimAction = async () => {
		try {
			setOperation(OPERATION.loading);
			// const claimResult = await claimTokens(contract, userInfo.address, userInfo.signature);
			// console.log(claimResult);

			setTimeout(() => setOperation(OPERATION.failed), 10000);
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
			<section className={styles.component}>
				<Header title="Claim Rewards" onBack={onBack} />
				<Content className={styles.content}>
					<p className={styles.title}>
						<span>{getConvertedAmount(amount)}</span>
						<br />
						Polka.dot Option Token
					</p>
					<Body2 className={styles.text} lighten={80}>
						When you claim without withdrawing your liquidity remains in the mining pool.
					</Body2>
					<Button
						className={styles.button}
						variant="contained"
						color="pink"
						size="large"
						onClick={claimAction}
					>
						{operation === OPERATION.loading && (
							<Spinner className={styles.spinner} color="white" size="small" />
						)}
						Claim Rewards
					</Button>
				</Content>
			</section>
			{failedPopUp.defined ? (
				<FailedPopUp control={failedPopUp} close={failedClose} onClick={claimAction} />
			) : null}
			{successPopUp.defined ? (
				<SuccessPopUp
					control={successPopUp}
					close={successClose}
					text="You've successfully claimed rewards"
				/>
			) : null}
		</>
	);
};
