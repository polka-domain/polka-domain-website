import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Step1.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { Form } from "react-final-form";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Body3 } from "../../../../ui/typography";
import { recordUserInformation } from "../../../../api/user";
import { Box } from "../../../../modules/box";
import { hexifyMessage, useWeb3 } from "../../../../web3/web3";

export type ValuesType = "email" | "ethereumAddress" | "twitter" | "telegram" | "domain";

type Step1Type = {
	initialEthereumAddress?: string;
	nextStep?: () => void;
} & MaybeWithClassName;

const keyMap = {
	eth_address: "ethereumAddress",
};

export const composeValidators = (...validators: any[]) => (value: string) =>
	validators.reduce((error, validator) => error || validator(value), undefined);

export function isRequired(value: string): string | undefined {
	return value ? undefined : "This field is required.";
}

export function isValidEmail(value: string): string | undefined {
	return /\S+@\S+\.\S+/.test(value) ? undefined : "Invalid email address";
}

export function isValidUsername(value: string): string | undefined {
	return value.startsWith("@") ? undefined : "Start your username with @";
}

type FormValues = "ethereumAddress" | "email" | "twitter" | "telegram" | "domain" | "sign";
type FormRecord = Record<FormValues, string>;

export const Step1: FC<Step1Type> = ({ className, nextStep, initialEthereumAddress }) => {
	const web3 = useWeb3();
	return (
		<>
			<Form<FormRecord>
				noValidate
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
				render={({ handleSubmit }) => (
					<Box className={classNames(className, styles.component)}>
						<form className={styles.form} onSubmit={handleSubmit} noValidate>
							<Input
								className={classNames(styles.input, styles.full)}
								name="email"
								label="Email address"
								type="email"
								required
								placeholder="youremail@address.com"
								validate={composeValidators(isRequired, isValidEmail)}
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
								placeholder="@yourtwitter"
								required
								validate={composeValidators(isRequired, isValidUsername)}
							/>
							<Input
								className={styles.input}
								name="telegram"
								label="Telegram Username"
								type="text"
								placeholder="@username"
								required
								validate={composeValidators(isRequired, isValidUsername)}
							/>
							<Input
								className={classNames(styles.input, styles.full)}
								name="domain"
								label="Your desired Polka.Domain"
								type="text"
								placeholder="Your desired Polka.Domain"
								required
								validate={isRequired}
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
						</form>
					</Box>
				)}
			/>
		</>
	);
};
