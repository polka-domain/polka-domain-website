import classNames from "classnames";
import type { FC } from "react";

import styles from "./Shadow.module.scss";

type ShadowType = {
	animated: boolean;
	visible: boolean;
};

type ComponentType = ShadowType;

export const Shadow: FC<ComponentType> = ({ visible, animated }) => {
	return (
		<div
			className={classNames(
				styles.component,
				visible && styles.visible,
				animated && styles.animation
			)}
		/>
	);
};
