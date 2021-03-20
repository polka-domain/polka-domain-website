import classNames from "classnames";
import { FC } from "react";

import styles from "./Header.module.scss";
import { MaybeWithClassName } from "../../helper/react/types";

type HeaderType = {};

export const Header: FC<HeaderType & MaybeWithClassName> = ({ className }) => {
	return <header className={classNames(styles.component, className)}>header</header>;
};
