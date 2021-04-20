import classNames from "classnames";
import styles from "./Stake.module.scss";
import React, { FC, useState } from "react";
import { Header } from "../header";
import { Content } from "../content";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Form } from "react-final-form";
import { isRequired } from "../../../../utils/page/validation";
import { Body3 } from "../../../../ui/typography";
import { getConvertedAmount } from "../../utils/converted-amount";

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

	const content = () => {
		switch (operation) {
			case OPERATION.default:
				return (
					<>
						<Form
							noValidate
							onSubmit={stakeAction}
							render={({ handleSubmit }) => (
								<form className={styles.form} onSubmit={handleSubmit} noValidate>
									<Input
										className={classNames(styles.input, styles.full)}
										name="amount"
										label={
											<p>
												Amount <span>Balance: {balance} NAMES</span>
											</p>
										}
										type="text"
										required
										placeholder="Enter Amount"
										validate={isRequired}
									/>
									<dl className={styles.list}>
										<Body3 className={styles.term} Component="dt" weight="medium">
											LPT Staked
										</Body3>
										<Body3
											className={styles.description}
											Component="dd"
											weight="medium"
											lighten={80}
										>
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
										Stake LPT
									</Button>
								</form>
							)}
						/>
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
				<Header title="Stake LPT" onBack={onBack} />
				<Content className={styles.content}>{content()}</Content>
			</div>
		</>
	);
};
