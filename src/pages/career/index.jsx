import SEO from "@components/seo";
import CareerContainer from "@containers/career";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import React from "react";
export const runtime = 'experimental-edge';
const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle="Career" />
            <Header />
            <main id="main-content">
                <CareerContainer />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default index;

