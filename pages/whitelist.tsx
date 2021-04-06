import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Whitelist } from "../src/pages/whitelist";

const Index = pageWithLayout(
	() => <Whitelist />,
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
