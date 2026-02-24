import SEO from "@components/seo";
import EditForm from "@containers/managerForm/editForm";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import { getCategories } from "@redux/slices/category";
import { getCommunities, getGeoLocation } from "@redux/slices/community";
import { wrapper } from "@redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export const runtime = 'experimental-edge';
const ManagerEdit = ({ communities }) => {
    const router = useRouter();
    useEffect(() => {
        if (!window.localStorage.getItem("accessToken")) {
            router.push(`/communities`);
        }
    }, []);

    return (
        <Wrapper>
            <SEO
                pageTitle="Edit"
                description="Edit Community Manager"
                // imageUrl={community?.images?.logo}
            />
            <Header />
            <main id="main-content">
                <EditForm communities={communities} />
            </main>
            <Footer />
        </Wrapper>
    );
};
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query }) => {
            await store.dispatch(getCommunities({ ...query, perPage: 90 }));
            await store.dispatch(getGeoLocation());
            await store.dispatch(getCategories());
            const serializedCommunities =
                store.getState().community.communities?.rows;
            const meta = store.getState().community?.communities?.meta;
            const countries = [
                ...new Set(serializedCommunities?.map((r) => r.country)),
            ].map((country) => ({ text: country, value: country }));

            const categories = store.getState().category.categories?.rows;

            const serializedError = store.getState().community.error;
            const geoLocation = store.getState().community.geoLocation;
            return {
                props: {
                    communities: serializedCommunities,
                    categories,
                    geoLocation,
                    error: serializedError,
                    countries: Array.from(new Set(countries)),
                    meta,
                },
            };
        }
);

export default ManagerEdit;

