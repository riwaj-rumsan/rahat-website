import Summary from "@components/donation-summary";
import SEO from "@components/seo";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import { getDonationDetails } from "@redux/slices/donation";
import { wrapper } from "@redux/store";
export const runtime = 'edge';
export default function DonationView({ donation }) {
    return (
        <Wrapper>
            <SEO pageTitle="Donations" />
            <Header />
            <main id="main-content">
                <Summary donation={donation} />
            </main>
            <Footer />
        </Wrapper>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query }) => {
            await store.dispatch(getDonationDetails(query?.id));
            const serializedDonations = store.getState().donation.donation;
            console.log("first", serializedDonations);
            const serializedError = store.getState().donation.error;
            return {
                props: {
                    donation: serializedDonations,
                    error: serializedError,
                },
            };
        }
);
