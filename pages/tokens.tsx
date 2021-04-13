import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Tokens } from "../src/pages/tokens";

const Index = pageWithLayout(
	() => <Tokens />,
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
