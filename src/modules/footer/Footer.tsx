import classNames from "classnames";
import { FC } from "react";

import styles from "./Footer.module.scss";
import { MaybeWithClassName } from "../../helper/react/types";

type FooterType = {};

export const Footer: FC<FooterType & MaybeWithClassName> = ({ className }) => {
	return <footer className={classNames(styles.component, className)}>footer</footer>;
};
