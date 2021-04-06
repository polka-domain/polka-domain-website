import React, { FC, useState } from "react";
import classNames from "classnames";
import { defineFlowStep } from "../../../../modules/flow/definition";
import { useFlowControl } from "../../../../modules/flow/hooks";
import styles from "./Step1.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { Form } from "react-final-form";
import { Button, NavLink } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Body3 } from "../../../../ui/typography";
import { useControlPopUp } from "../../../../ui/pop-up-container";
import { ConnectMetaPopUp } from "../../../../modules/launch-pop-up";
import { MetaActions } from "../../../../modules/launch-pop-up/ConnectMetaPopUp";

type Step1Type = { nextStep?: () => void } & MaybeWithClassName;

type ValuesType = "email" | "ethereumAddress";

export const Step1Base: FC<Step1Type> = ({ className, nextStep }) => {
	const [metaConnect, setMetaConnect] = useState<MetaActions>(undefined);

	const { popUp, close, toggle } = useControlPopUp();

	return (
		<>
			<Form
				onSubmit={async (values) => {
					const eth = values["ethereumAddress"];
					const sign = await metaConnect.signPersonalMessage(eth, eth);
					console.log({
						...values,
						sign,
					});
				}}
				validate={(values: Record<ValuesType, any>) => {
					const errors: Partial<Record<ValuesType, string>> = {};
					if (!values.ethereumAddress) {
						errors.ethereumAddress = "Required";
					}
					if (!values.email) {
						errors.email = "Required";
					}
					return errors;
				}}
				render={({ handleSubmit, form }) => (
					<form className={classNames(className, styles.component)} onSubmit={handleSubmit}>
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
							placeholder="Enter your desire domain"
						/>
						{metaConnect ? (
							<Button
								className={classNames(styles.submit, styles.full)}
								variant="contained"
								color="pink"
								size="large"
								submit
							>
								Submit Your Entry
							</Button>
						) : (
							<Button
								className={classNames(styles.submit, styles.full)}
								variant="contained"
								color="pink"
								size="large"
								onClick={toggle}
							>
								Connect Wallet
							</Button>
						)}
						<Body3 className={classNames(styles.note, styles.full)} lighten={60}>
							We will randomly award 200 participants with whitelist spots and 100 participants with
							their unique Polka.Domain 😉
						</Body3>
						<Body3 className={classNames(styles.announce, styles.full)} lighten={60}>
							Winners will be announced and posted{" "}
							<NavLink style={{ marginLeft: 8 }} variant="text" color="pink" href="#">
								here
							</NavLink>
							.
						</Body3>
						{popUp.defined && (
							<ConnectMetaPopUp
								control={popUp}
								close={close}
								next={(eth, actions) => {
									setMetaConnect(actions);
									form.change("ethereumAddress", eth);
									close();
								}}
							/>
						)}
					</form>
				)}
			/>
		</>
	);
};

const Step1Imp: FC<Step1Type> = ({ className }) => {
	const { moveForward } = useFlowControl();

	return <Step1Base className={className} nextStep={moveForward} />;
};

export const Step1 = defineFlowStep<{}, {}, Step1Type>({
	Body: Step1Imp,
});
