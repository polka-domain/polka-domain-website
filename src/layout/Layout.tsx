import Head from "next/head";
import classNames from "classnames";
import { ReactNode } from "react";

import styles from "./Layout.module.scss";
import { Header } from "../modules/header";
import { Footer } from "../modules/footer";

interface ILayoutProps {
	children?: ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
	className?: string;
}

export const Layout = ({
	children,
	className,
	title = "",
	description = "",
	keywords,
}: ILayoutProps) => {
	return (
		<div className={classNames(styles.component, className)}>
			<Head>
				<title>{title}</title>
				<meta name="Description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			<main className={styles.content}>{children}</main>
			<Footer />
		</div>
	);
};
