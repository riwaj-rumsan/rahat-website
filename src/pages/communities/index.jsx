import SEO from "@components/seo";
import CommunityArea from "@containers/community";
import { MapView } from "@containers/maps";
import Footer from "@layout/footer";
import Header from "@layout/header";
import { getCategories } from "@redux/slices/category";
import { getCommunities, getGeoLocation } from "@redux/slices/community";
import Wrapper from "src/layout/wrapper";
export const runtime = 'experimental-edge';
// Demo Data
import { wrapper } from "@redux/store";

export default function Product({
    communities,
    categories,
    countries,
    meta,
    geoLocation,
}) {
    console.log(geoLocation);
    return (
        <Wrapper>
            <SEO pageTitle="Communities" />
            <Header />
            <main id="main-content">
                <div>
                    <MapView
                        sx={{
                            height: 400,
                        }}
                        mapData={geoLocation?.map((r) => ({
                            latitude: r?.longitude,
                            longitude: r?.latitude,
                            country: r?.country,
                        }))}
                    />
                </div>
                <CommunityArea
                    communities={communities}
                    countries={countries}
                    categories={categories}
                    meta={meta}
                />
            </main>
            <Footer />
        </Wrapper>
    );
}
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

