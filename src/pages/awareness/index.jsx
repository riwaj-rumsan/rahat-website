import AnticipatoryActionBingo from "@components/awareness-page/anticipatory-action-bingo";
import AnticipatoryActionBingoSteps from "@components/awareness-page/anticipatory-action-steps";
import AwarenessBreadcrumb from "@components/awareness-page/awareness-breadcrumb";
import WhyShouldWePlayBingo from "@components/awareness-page/why-should-you-play";
import SEO from "@components/seo";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
export const runtime = 'experimental-edge';
export default function Awareness() {
    return (
        <Wrapper>
            <SEO pageTitle="Awareness" />
            <Header />
            <AwarenessBreadcrumb />
            <AnticipatoryActionBingo />
            <AnticipatoryActionBingoSteps />
            <WhyShouldWePlayBingo />
            <Footer />
        </Wrapper>
    );
}

