import React, { CSSProperties, FC } from "react";
import styles from "./ButtonsGroup.module.scss";
import classNames from "classnames";

import { MaybeWithClassName } from "../../helper/react/types";

type ButtonsGroupType = {
	style?: CSSProperties;
};

export const ButtonsGroup: FC<ButtonsGroupType & MaybeWithClassName> = ({
	className,
	children,
	...props
}) => {
	return (
		<div className={classNames(className, styles.component)} {...props}>
			{children}
		</div>
	);
};
