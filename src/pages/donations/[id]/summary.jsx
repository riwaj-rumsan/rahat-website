import Summary from "@components/donation-summary";
import SEO from "@components/seo";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
export const runtime = 'experimental-edge';
// Demo data

export default function Donations({ donations }) {
    return (
        <Wrapper>
            <SEO pageTitle="Donations" />
            <Header />
            <main id="main-content">
                <Summary />
            </main>
            <Footer />
        </Wrapper>
    );
};