import SEO from "@components/seo";
import JobDetails from "@containers/career/details";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import React from "react";
import datas from "../../../data/career.json";
import { useRouter } from "next/router";
export const runtime = 'experimental-edge';
const Index = () => {
    const router = useRouter();
    const { slug } = router.query;
    const data = datas?.jobs?.find((content) => content?.slug === slug);

    return (
        <Wrapper>
            <SEO />
            <Header />
            <main id="main-content" className="mt-3">
                <JobDetails data={data} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Index;

