import React, { FC, ReactNode } from "react";
import styles from "./HeadlinePlusSubline.module.scss";

type HeadlinePlusSubline = {
	headline: string;
	subline?: ReactNode;
};

export const HeadlinePlusSubline: FC<HeadlinePlusSubline> = ({ headline, subline, children }) => {
	return (
		<>
			<span className={styles.title}>{headline}</span>
			{subline && <p className={styles.text}>{subline}</p>}
			{children && <div className={styles.extensions}>{children}</div>}
		</>
	);
};
