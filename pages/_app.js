import { Component, cloneElement, Fragment } from "react";
import "../src/theme/globals.scss";
import "../src/theme/variables.scss";

const FragmentLayout = <Fragment />;

const MyApp = ({ Component, pageProps }) => {
	const Layout = "layout" in Component ? Component.layout() : FragmentLayout;

	return cloneElement(Layout, { children: <Component {...pageProps} /> });
};

export default MyApp;
