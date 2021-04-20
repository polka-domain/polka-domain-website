import classNames from "classnames";
import styles from "./UnStake.module.scss";
import { FC, useState } from "react";
import { Header } from "../header";
import { Content } from "../content";
import { Button } from "../../../../ui/button";
import { Body3 } from "../../../../ui/typography";
import { getConvertedAmount } from "../../utils/converted-amount";

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

	const content = () => {
		switch (operation) {
			case OPERATION.default:
				return (
					<>
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
							Unstake LPT
						</Button>
					</>
				);

			case OPERATION.loading:
				return "Loading...";

			case OPERATION.completed:
				return "Completed";

			case OPERATION.failed:
				return "Failed";
		}
	};

	return (
		<>
			<div className={styles.component}>
				<Header title="Unstake LPT" onBack={onBack} />
				<Content className={styles.content}>{content()}</Content>
			</div>
		</>
	);
};
