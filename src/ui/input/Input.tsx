import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import { Field } from "react-final-form";
import { MaybeWithClassName } from "../../helper/react/types";
import { TextColor } from "../text-color";
import { ReactNode } from "react";

type InputType = {
	name: string;
	label: string | ReactNode;
	type: "text" | "email";
	placeholder?: string;
	readOnly?: boolean;
	initialValue?: any;
	required?: boolean;
	validate?: (value: string) => any;
};

export const Input: FC<InputType & MaybeWithClassName> = ({
	className,
	name,
	label,
	type,
	placeholder,
	readOnly,
	initialValue,
	required,
	validate,
}) => {
	return (
		<Field name={name} initialValue={initialValue} validate={validate}>
			{({ input, meta }) => (
				<div className={classNames(className, styles.component)}>
					<label className={styles.label}>
						{label}
						<input
							{...input}
							className={styles.input}
							type={type}
							placeholder={placeholder}
							readOnly={readOnly}
							required={required}
						/>
					</label>
					<div className={styles.error}>
						{meta.error && meta.touched && <TextColor color="pink">{meta.error}</TextColor>}
						{meta.submitError && <TextColor color="pink">{meta.submitError}</TextColor>}
					</div>
				</div>
			)}
		</Field>
	);
};
