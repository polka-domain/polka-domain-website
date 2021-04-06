import Head from "next/head";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import styles from "./Layout.module.scss";
import theme from "../ui/styles/Theme.module.scss";
import { Header } from "../modules/header";
import { getModeClassName } from "../ui/utils/get-theme-class-name";
// import { Footer } from "../modules/footer";

type LayoutType = {
	children?: ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
	className?: string;
	mode?: "dark" | "light" | "transparent";
	fixedHeader?: boolean;
};

export const Layout: FC<LayoutType> = ({
	children,
	className,
	title = "",
	description = "",
	keywords,
	mode = "dark",
	fixedHeader,
}) => {
	return (
		<div className={classNames(styles.component, getModeClassName(mode, theme), className)}>
			<Head>
				<title>{title}</title>
				<meta name="Description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header
				className={classNames(styles.header, fixedHeader && styles.fixed)}
				fixed={fixedHeader}
			/>
			<main className={styles.main}>{children}</main>
			{/*<Footer />*/}
		</div>
	);
};
