import SEO from "@components/seo";
import CommunityDetails from "@containers/community/details";
import CommunityIntro from "@containers/community/details/community-intro";
import Footer from "@layout/footer";
import Header from "@layout/header";
import { getCommunityDetails } from "@redux/slices/community";
import { getOrganizationTransactions } from "@redux/slices/organization";
import { wrapper } from "@redux/store";
import { Button } from "react-bootstrap";
import Wrapper from "src/layout/wrapper";
export const runtime = 'experimental-edge';
const Author = ({ community, transactions }) => (
    <Wrapper>
        <SEO
            pageTitle={community?.name}
            description={community?.description}
            imageUrl={community?.images?.logo}
        />
        <Header />
        <main id="main-content">
            <CommunityIntro community={community} />
            <CommunityDetails
                community={community}
                transactions={transactions}
            />
        </main>
        <Footer />
    </Wrapper>
);

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query }) => {
            await store.dispatch(getCommunityDetails(query?.address));
            const community = store.getState().community.community;
            const serializedError = store.getState().community.error;

            await store.dispatch(getOrganizationTransactions(query?.address));
            const transactions =
                store.getState().organization.organizationTransactions;
            const serializedErrorOrganization =
                store.getState().organization.error;

            return {
                props: {
                    community,
                    error: serializedError,
                    transactions,
                    errorOrganization: serializedErrorOrganization,
                },
            };
        }
);
export default Author;

