import { pageWithLayout } from "../src/utils/page/pageInLayout";
import { Layout } from "../src/layout";
import { Home } from "../src/pages/home";

const Index = pageWithLayout(
	() => <Home />,
	({ children }) => (
		<Layout title="Polka.Domain" description="Take ownership of your digital identity and assets.">
			{children}
		</Layout>
	)
);

export default Index;
