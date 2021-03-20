import { FC, ReactElement } from "react";

export type PageWithLayout<T extends {}> = FC & {
	layout(): ReactElement;
	getInitialProps?(): Promise<T>;
};

/**
 * connects Page, PageLayout and getInitialProps
 * @param pageComponent
 * @param layout
 */

export const pageWithLayout = <T extends {}>(
	pageComponent: FC<T>,
	layout: () => ReactElement
): PageWithLayout<T> => {
	const page: any = pageComponent;
	page.layout = layout;
	return page;
};
