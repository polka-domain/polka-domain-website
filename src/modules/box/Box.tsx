import React, { CSSProperties, FC } from "react";
import styles from "./Box.module.scss";
import classNames from "classnames";

import { MaybeWithClassName } from "../../helper/react/types";
import PLANET1 from "./assets/planet1.png";
import PLANET2 from "./assets/planet3.png";
import { Image } from "../../ui/image";

type BoxType = {
	size?: "md" | "lg";
	style?: CSSProperties;
};

export const Box: FC<BoxType & MaybeWithClassName> = ({
	className,
	children,
	size = "md",
	...props
}) => {
	return (
		<div
			className={classNames(className, styles.component, size === "lg" && styles.large)}
			{...props}
		>
			{children}
			<Image className={styles.image1} img={PLANET1} width={154} height={154} alt="Planet" />
			<Image className={styles.image2} img={PLANET2} width={104} height={104} alt="Planet" />
		</div>
	);
};
