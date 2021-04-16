import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Whitelist } from "../src/pages/whitelist";
import { Tokens } from "../src/pages/tokens";
import NoSsr from "../src/modules/no-ssr/NoSsr";

const Index = pageWithLayout(
	() => (
		<NoSsr>
			<Whitelist />
		</NoSsr>
	),
	({ children }) => (
		<Layout
			title="Polka.Domain"
			description="Take ownership of your digital identity and assets."
			mode="transparent"
			withDecoration={true}
			fixedHeader={true}
			web3={true}
		>
			{children}
		</Layout>
	)
);

export default Index;
