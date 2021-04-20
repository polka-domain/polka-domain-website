import classNames from "classnames";
import styles from "./Claim.module.scss";
import { FC, useState } from "react";
import { Header } from "../header";
import { getConvertedAmount } from "../../utils/converted-amount";
import { Button } from "../../../../ui/button";
import { Content } from "../content";
import { Body2 } from "../../../../ui/typography/Typography";

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
							Claim Rewards
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
			<section className={styles.component}>
				<Header title="Claim Rewards" onBack={onBack} />
				<Content className={styles.content}>{content()}</Content>
			</section>
		</>
	);
};
