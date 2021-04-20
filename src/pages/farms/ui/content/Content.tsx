import classNames from "classnames";
import styles from "./Content.module.scss";
import { FC } from "react";
import { MaybeWithClassName, WithChildren } from "../../../../helper/react/types";

export const Content: FC<WithChildren & MaybeWithClassName> = ({ className, children }) => {
	return <div className={classNames(className, styles.component)}>{children}</div>;
};
