import Head from "next/head";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import styles from "./Layout.module.scss";
import theme from "../ui/styles/Theme.module.scss";
import mobileTheme from "../ui/styles/MobileTheme.module.scss";
import { Header } from "../modules/header";
import { getModeClassName } from "../ui/utils/get-theme-class-name";
import { Image } from "../ui/image";
// import { Footer } from "../modules/footer";
import PLANET2 from "./assets/planet2.png";
import PLANET4 from "./assets/planet4.png";
import { reCAPTCHA_site_key } from "../const/const";
import { ConnectionModal, Web3ProviderRoot } from "../web3/Web3Provider";
import { OnlyDesktop } from "../modules/only-desktop";

type LayoutType = {
	children?: ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
	className?: string;
	mode?: "dark" | "light" | "transparent";
	fixedHeader?: boolean;
	withDecoration?: boolean;
	web3?: boolean;
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
	web3 = false,
}) => {
	return (
		<div
			className={classNames(
				styles.component,
				getModeClassName(mode, theme),
				getModeClassName(mode, mobileTheme),
				className
			)}
		>
			<Head>
				<title>{title}</title>
				<meta name="Description" content={description} />
				<meta name="keywords" content={keywords} />
				<script src={`https://www.google.com/recaptcha/api.js?render=${reCAPTCHA_site_key}`} />
			</Head>
			<Header className={styles.header} fixed={fixedHeader} />
			<main className={styles.main}>
				<Web3ProviderRoot>
					{web3 ? (
						<>
							<div className={styles.desktop}>
								<ConnectionModal />
								{children}
							</div>
							<div className={styles.mobile}>
								<OnlyDesktop />
							</div>
						</>
					) : (
						<>{children}</>
					)}
				</Web3ProviderRoot>
			</main>
			{withDecoration && (
				<div className={styles.decoration}>
					{/*<Image className={styles.image1} img={PLANET1} width={154} height={154} alt="Planet" />*/}
					<Image className={styles.image2} img={PLANET2} width={100} height={100} alt="Planet" />
					{/*<Image className={styles.image3} img={PLANET3} width={104} height={104} alt="Planet" />*/}
					<Image className={styles.image4} img={PLANET4} width={60} height={60} alt="Planet" />
				</div>
			)}
			{/*<Footer />*/}
		</div>
	);
};
