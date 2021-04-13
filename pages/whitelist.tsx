import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Whitelist } from "../src/pages/whitelist";

const Index = pageWithLayout(
	() => <Whitelist />,
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
