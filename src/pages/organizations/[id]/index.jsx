import SEO from "@components/seo";
import OrganizationIntroArea from "@containers/organization/organization-intro";
import OrganizationProfileArea from "@containers/organization/organizations-profile";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import { getOrganizationDetails } from "@redux/slices/organization";
import { wrapper } from "@redux/store";
export const runtime = 'edge';
const OrganizationProfile = ({ organization }) => {
    return (
        <Wrapper>
            <SEO
                pageTitle={organization?.name}
                description={organization?.description}
            />
            <Header />
            <main id="main-content">
                <OrganizationIntroArea organization={organization} />
                <OrganizationProfileArea organization={organization} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query }) => {
            await store.dispatch(getOrganizationDetails(query?.id));
            const organization = store.getState().organization.organization;
            const serializedError = store.getState().organization.error;
            return {
                props: {
                    organization,
                    error: serializedError,
                },
            };
        }
);

export default OrganizationProfile;
