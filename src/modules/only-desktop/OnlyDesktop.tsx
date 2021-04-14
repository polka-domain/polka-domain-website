import React, { CSSProperties, FC } from "react";
import styles from "./OnlyDesktop.module.scss";
import { GutterBox } from "../../ui/gutter-box";
import { useWindowSize } from "../../hooks/use-window-size";
import { Heading4, Body1 } from "../../ui/typography";

export const OnlyDesktop: FC = () => {
	const windowHeight = useWindowSize()[1];

	return (
		<section
			className={styles.component}
			style={{ "--window-height": `${windowHeight}px` } as CSSProperties}
		>
			<GutterBox className={styles.wrapper}>
				<div className={styles.box}>
					<div className={styles.content}>
						<Heading4 className={styles.title}>
							Sorry, this event is unavailable on mobile.
						</Heading4>
						<Body1 className={styles.text} lighten={60}>
							Please visit our desktop website to participate.
						</Body1>
					</div>
				</div>
			</GutterBox>
		</section>
	);
};
