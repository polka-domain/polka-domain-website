import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Whitelist } from "../src/pages/whitelist";
import { Web3ProviderRoot } from "../src/web3/Web3Provider";

const Index = pageWithLayout(
	() => <Whitelist />,
	({ children }) => (
		<Layout
			title="Polka.Domain"
			description="Take ownership of your digital identity and assets."
			mode="transparent"
			withDecoration={true}
			fixedHeader={true}
		>
			<Web3ProviderRoot>{children}</Web3ProviderRoot>
		</Layout>
	)
);

export default Index;
