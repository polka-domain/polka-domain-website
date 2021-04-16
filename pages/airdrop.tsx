import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Airdrop } from "../src/pages/airdrop";
import NoSsr from "../src/modules/no-ssr/NoSsr";

const Index = pageWithLayout(
	() => (
		<NoSsr>
			<Airdrop />
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
