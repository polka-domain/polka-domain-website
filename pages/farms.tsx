import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import NoSsr from "../src/modules/no-ssr/NoSsr";
import { Farms } from "../src/pages/farms";

const Index = pageWithLayout(
	() => (
		<NoSsr>
			<Farms />
		</NoSsr>
	),
	({ children }) => (
		<Layout
			title="Polka.Domain"
			description="Take ownership of your digital identity and assets."
			mode="transparent"
			fixedHeader={true}
			web3={true}
		>
			{children}
		</Layout>
	)
);

export default Index;
