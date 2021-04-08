import React, { FC } from "react";
import styles from "./Step1.module.scss";
import { defineFlowStep } from "../../../../modules/flow/definition";
import { Auction } from "../auction";
import { Button } from "../../../../ui/button";

export const Step1Base: FC = () => {
	return (
		<Auction>
			<Button size="large" color="pink" variant="contained">
				Join Auction
			</Button>
		</Auction>
	);
};

export const Step1 = defineFlowStep({
	Body: Step1Base,
});
