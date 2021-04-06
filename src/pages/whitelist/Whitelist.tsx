import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Whitelist.module.scss";
import theme from "../../ui/styles/Theme.module.scss";
import { Heading1 } from "../../ui/typography";
import { GutterBox } from "../../ui/gutter-box";
import { getModeClassName } from "../../ui/utils/get-theme-class-name";
import { TextColor } from "../../ui/text-color";
import { defineFlow } from "../../modules/flow/definition";
import { Flow } from "../../modules/flow";
import { Step1 } from "./ui/Step1";
import { Step2 } from "./ui/Step2";

type WhitelistType = {};

const STEPS = defineFlow(Step1, Step2);

export const Whitelist: FC<WhitelistType> = () => {
	return (
		<section className={styles.component}>
			<GutterBox className={styles.wrapper}>
				<Heading1 className={styles.title}>
					Welcome to Our <TextColor color="pink">Whitelist Lottery</TextColor>,<br />
					Get First Dibs on Polka.Domain
				</Heading1>
				<div className={classNames(styles.formWrapper, getModeClassName("light", theme))}>
					<Flow steps={STEPS} onComplete={() => alert("Finish")}>
						{(body) => body}
					</Flow>
				</div>
			</GutterBox>
		</section>
	);
};
