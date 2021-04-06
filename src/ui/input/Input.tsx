import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import { Field } from "react-final-form";
import { MaybeWithClassName } from "../../helper/react/types";

type InputType = {
	name: string;
	label: string;
	type: "text";
	placeholder?: string;
};

export const Input: FC<InputType & MaybeWithClassName> = ({
	className,
	name,
	label,
	type,
	placeholder,
}) => {
	return (
		<Field name={name}>
			{({ input, meta }) => (
				<div className={classNames(className, styles.component)}>
					<label className={styles.label}>
						{label}
						<input {...input} className={styles.input} type={type} placeholder={placeholder} />
					</label>
					<div className={styles.error}>
						{meta.error && meta.touched && <span>{meta.error}</span>}
					</div>
				</div>
			)}
		</Field>
	);
};
