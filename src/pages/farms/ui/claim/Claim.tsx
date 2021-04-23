import classNames from "classnames";
import styles from "./Claim.module.scss";
import { FC, useCallback, useEffect, useState } from "react";
import { Header } from "../header";
import { getConvertedAmount } from "../../utils/converted-amount";
import { Button } from "../../../../ui/button";
import { Content } from "../content";
import { Body2 } from "../../../../ui/typography/Typography";
import { useControlPopUp } from "../../../../ui/pop-up-container";
import { Spinner } from "../../../../ui/spinner";
import { SuccessPopUp } from "../success";
import { FailedPopUp } from "../failed";
import { Contract } from "web3-eth-contract";
import { claimRewards, getRewardInfo, useContract } from "../../../../web3/farms-contract";
import { useWeb3Provider } from "../../../../web3/web3";
import { useWeb3React } from "@web3-react/core";
import { fromWei, toWei } from "web3-utils";
import BigNumber from "bn.js";

enum OPERATION {
	default = "",
	loading = "loading",
	completed = "completed",
	failed = "failed",
}

const fetchInformation = async (contract: Contract, account: string) => {
	const pReward = getRewardInfo(contract, account);

	const [reward] = await Promise.all([pReward]);
	return {
		reward,
	};
};

export const Claim: FC<{ onBack(): void }> = ({ onBack }) => {
	const [amount, setAmount] = useState<string>("0");

	const provider = useWeb3Provider();
	const { active, account, chainId } = useWeb3React();
	const contract = useContract(provider, chainId);

	const updateData = useCallback(async () => {
		if (!contract) {
			return;
		}
		try {
			const { reward } = await fetchInformation(contract, account);

			setAmount(fromWei(reward));
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

	const [lastOperation, setLastOperation] = useState<(() => void) | null>(null);

	const claimAction = async () => {
		const operation = async () => {
			try {
				setOperation(OPERATION.loading);
				const claimResult = await claimRewards(contract, account);
				console.log(claimResult);
				setOperation(OPERATION.completed);
				await updateData();
				setLastOperation(null);
			} catch (e) {
				console.error("failed to claim", e);
				setOperation(OPERATION.failed);
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

	const claimIsAvailable = amount ? new BigNumber(toWei(amount)).gtn(0) : false;

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
						disabled={!claimIsAvailable}
						onClick={claimAction}
					>
						{operation === OPERATION.loading && (
							<Spinner className={styles.spinner} color="white" size="small" />
						)}
						{operation === OPERATION.loading ? "Claiming..." : "Claim Rewards"}
					</Button>
				</Content>
			</section>
			{failedPopUp.defined ? (
				<FailedPopUp
					control={failedPopUp}
					close={() => {
						failedClose();
						setOperation(OPERATION.default);
					}}
					onClick={tryAgainAction}
				/>
			) : null}
			{successPopUp.defined ? (
				<SuccessPopUp
					control={successPopUp}
					close={() => {
						successClose();
						setOperation(OPERATION.default);
					}}
					text="You've successfully claimed rewards"
				/>
			) : null}
		</>
	);
};
