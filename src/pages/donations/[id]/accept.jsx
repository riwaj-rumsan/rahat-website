import SEO from "@components/seo";
import AcceptDonation from "@containers/accept-donation";
import Footer from "@layout/footer";
import Header from "@layout/header";
import { getDonationDetails } from "@redux/slices/donation";
import { wrapper } from "@redux/store";
import Wrapper from "src/layout/wrapper";
export const runtime = 'edge';
const PrivacyPolicy = ({ donations }) => (
    <Wrapper>
        <SEO pageTitle="Accept Donation" />
        <Header />
        <main id="main-content">
            <AcceptDonation donations={donations} />
        </main>
        <Footer />
    </Wrapper>
);

export default PrivacyPolicy;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ query }) => {
        await store.dispatch(getDonationDetails(query?.id));
        const serializedDonations = store.getState().donation.donation;
        console.log(serializedDonations);
        const serializedError = store.getState().donation.error;
        return {
            props: {
                donations: serializedDonations,
                error: serializedError,
                className: "template-color-1"
            },
        };
    }
);
