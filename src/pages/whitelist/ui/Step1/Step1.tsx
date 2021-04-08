import React, { FC } from "react";
import classNames from "classnames";
import { defineFlowStep } from "../../../../modules/flow/definition";
import { useFlowControl } from "../../../../modules/flow/hooks";
import styles from "./Step1.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { Form } from "react-final-form";
import { Button, NavLink } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Body3 } from "../../../../ui/typography";
import { recordUserInformation } from "../../../../api/user";
import { Box } from "../../../../modules/box/Box";
import { hexifyMessage, useWeb3 } from "../../../../web3/web3";

export type ValuesType = "email" | "ethereumAddress" | "twitter" | "telegram" | "domain";

type Step1Type = {
	initialEthereumAddress?: string;
	nextStep?: () => void;
} & MaybeWithClassName;

const keyMap = {
	eth_address: "ethereumAddress",
};

export const Step1Base: FC<Step1Type> = ({ className, nextStep, initialEthereumAddress }) => {
	const web3 = useWeb3();
	return (
		<>
			<Form
				onSubmit={async (values) => {
					const eth = values["ethereumAddress"];
					const sign = await web3.eth.personal.sign(hexifyMessage(eth), eth, "");
					const { ethereumAddress: eth_address, ...rest } = values;
					try {
						await recordUserInformation({
							eth_address,
							...rest,
							sign,
						});
						nextStep();
					} catch (e) {
						console.error(e);
						if (e.status === 400) {
							alert("wrong signature");
							return;
						}
						if (e.status === 422) {
							const errorMessage = e.data.error;
							const errors = Object.keys(errorMessage).reduce(
								(acc, key) => ({
									...acc,
									[keyMap[key] || key]: errorMessage[key][0],
								}),
								{}
							);
							console.log(errors, e.data);
							return errors;
						}
						alert("failed to submit");
					}
				}}
				validate={(values: Record<ValuesType, any>) => {
					const errors: Partial<Record<ValuesType, string>> = {};
					if (!values.ethereumAddress) {
						errors.ethereumAddress = "The eth address field is required.";
					}
					if (!values.email) {
						errors.email = "The email field is required.";
					}
					if (!values.twitter) {
						errors.twitter = "The twitter field is required.";
					}
					if (!values.telegram) {
						errors.telegram = "The telegram field is required.";
					} else if (!values.telegram.startsWith("@")) {
						errors.telegram = "The telegram must start with one of the following: @";
					}
					if (!values.domain) {
						errors.domain = "The domain field is required.";
					}
					return errors;
				}}
				render={({ handleSubmit }) => (
					<Box className={classNames(className, styles.component)}>
						<form className={styles.form} onSubmit={handleSubmit}>
							<Input
								className={classNames(styles.input, styles.full)}
								name="email"
								label="Email address"
								type="text"
								placeholder="youremail@address.com"
							/>
							<Input
								className={classNames(styles.input, styles.full)}
								name="ethereumAddress"
								label="ERC-20 Address"
								type="text"
								placeholder="0x32A9b7ED8C71C6910Gb4A9bc41de2391b74c2376"
								readOnly
								initialValue={initialEthereumAddress}
							/>
							<Input
								className={styles.input}
								name="twitter"
								label="Twitter Handle"
								type="text"
								placeholder="https://"
							/>
							<Input
								className={styles.input}
								name="telegram"
								label="Telegram Username"
								type="text"
								placeholder="@username"
							/>
							<Input
								className={classNames(styles.input, styles.full)}
								name="domain"
								label="Your desired Polka.Domain"
								type="text"
								placeholder="Your desired Polka.Domain"
							/>
							<Button
								className={classNames(styles.submit, styles.full)}
								variant="contained"
								color="pink"
								size="large"
								submit
							>
								Submit Your Entry
							</Button>
							<Body3 className={classNames(styles.note, styles.full)} lighten={60}>
								We will randomly award 200 participants with whitelist spots and 100 participants
								with their unique Polka.Domain 😉
							</Body3>
							<Body3 className={classNames(styles.announce, styles.full)} lighten={60}>
								Winners will be announced and posted{" "}
								<NavLink style={{ marginLeft: 8 }} variant="text" color="pink" href="#">
									here
								</NavLink>
								.
							</Body3>
						</form>
					</Box>
				)}
			/>
		</>
	);
};

const Step1Imp: FC<Step1Type> = ({ className, initialEthereumAddress }) => {
	const { moveForward } = useFlowControl();

	return (
		<Step1Base
			className={className}
			nextStep={moveForward}
			initialEthereumAddress={initialEthereumAddress}
		/>
	);
};

export const Step1 = defineFlowStep<{}, {}, Step1Type>({
	Body: Step1Imp,
});
