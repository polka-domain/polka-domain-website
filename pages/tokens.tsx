import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Tokens } from "../src/pages/tokens";
import { Web3ProviderRoot } from "../src/web3/Web3Provider";

const Index = pageWithLayout(
	() => <Tokens />,
	({ children }) => (
		<Layout
			title="Polka.Domain"
			description="Take ownership of your digital identity and assets."
			mode="transparent"
			fixedHeader={true}
			withDecoration={true}
		>
			<Web3ProviderRoot>{children}</Web3ProviderRoot>
		</Layout>
	)
);

export default Index;
