import classNames from "classnames";
import { FC } from "react";

import styles from "./Breakline.module.scss";
import { MaybeWithClassName } from "../../../helper/react/types";
import { GutterBox } from "../../../ui/gutter-box";

type BreaklineType = {};

export const Breakline: FC<BreaklineType & MaybeWithClassName> = ({ className }) => {
	return (
		<section className={classNames(className, styles.component)}>
			<GutterBox>
				<hr className={styles.breakline} />
			</GutterBox>
		</section>
	);
};
