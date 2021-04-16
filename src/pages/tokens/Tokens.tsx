import { FC } from "react";
import classNames from "classnames";
import styles from "./Tokens.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import { Pool } from "./ui/pool";

type TokensType = {};

export const Tokens: FC<TokensType> = () => {
	return (
		<>
			<section className={styles.component}>
				<GutterBox className={styles.gutter}>
					<div className={classNames(styles.wrapper, getModeClassName("light", theme))}>
						<Pool />
					</div>
				</GutterBox>
			</section>
		</>
	);
};
