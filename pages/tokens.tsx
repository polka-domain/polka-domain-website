import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Tokens } from "../src/pages/tokens";
import NoSsr from "../src/modules/no-ssr/NoSsr";

const Index = pageWithLayout(
	() => (
		<NoSsr>
			<Tokens />
		</NoSsr>
	),
	({ children }) => (
		<Layout
			title="Polka.Domain"
			description="Take ownership of your digital identity and assets."
			mode="transparent"
			fixedHeader={true}
			withDecoration={true}
			web3={true}
		>
			{children}
		</Layout>
	)
);

export default Index;
