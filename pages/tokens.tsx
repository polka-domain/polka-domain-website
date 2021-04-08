import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Tokens } from "../src/pages/tokens";

const Index = pageWithLayout(
	() => <Tokens />,
	() => (
		<Layout
			title="Polka.Domain"
			description="Take ownership of your digital identity and assets."
			mode="transparent"
			fixedHeader={true}
		/>
	)
);

export default Index;
