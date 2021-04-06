import React, { FC } from "react";
import { defineFlowStep } from "../../../../modules/flow/definition";
import styles from "./Step2.module.scss";

type Step2Type = {};

export const Step2Base: FC<Step2Type> = () => {
	return <div className={styles.component}></div>;
};

export const Step2 = defineFlowStep({
	Body: Step2Base,
});
