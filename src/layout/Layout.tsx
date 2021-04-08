import Head from "next/head";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import styles from "./Layout.module.scss";
import theme from "../ui/styles/Theme.module.scss";
import { Header } from "../modules/header";
import { getModeClassName } from "../ui/utils/get-theme-class-name";
import { Image } from "../ui/image";
// import { Footer } from "../modules/footer";

import PLANET1 from "./assets/planet1.png";
import PLANET2 from "./assets/planet2.png";
import PLANET3 from "./assets/planet3.png";
import PLANET4 from "./assets/planet4.png";

type LayoutType = {
	children?: ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
	className?: string;
	mode?: "dark" | "light" | "transparent";
	fixedHeader?: boolean;
	withDecoration?: boolean;
};

export const Layout: FC<LayoutType> = ({
	children,
	className,
	title = "",
	description = "",
	keywords,
	mode = "dark",
	fixedHeader,
	withDecoration,
}) => {
	return (
		<div className={classNames(styles.component, getModeClassName(mode, theme), className)}>
			<Head>
				<title>{title}</title>
				<meta name="Description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header className={styles.header} fixed={fixedHeader} />
			<main className={styles.main}>{children}</main>
			{withDecoration && (
				<div className={styles.decoration}>
					<Image className={styles.image1} img={PLANET1} width={154} height={154} alt="Planet" />
					<Image className={styles.image2} img={PLANET2} width={100} height={100} alt="Planet" />
					<Image className={styles.image3} img={PLANET3} width={104} height={104} alt="Planet" />
					<Image className={styles.image4} img={PLANET4} width={60} height={60} alt="Planet" />
				</div>
			)}
			{/*<Footer />*/}
		</div>
	);
};
