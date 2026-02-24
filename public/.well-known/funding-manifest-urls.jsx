
export async function getServerSideProps({ res }) {
    res.setHeader('Content-Type', 'text/plain');
    const urls = [
        'https://github.com/rahataid/rahat-platform/blob/main/funding.json'
    ];

    res.write(urls.join('\n'));
    res.end();

    return { props: {} };
}

export default function FundingManifestUrls() {
    return null;
}