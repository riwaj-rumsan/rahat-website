
export async function getServerSideProps({ res }) {
    res.setHeader('Content-Type', 'text/plain');
    
    const stellarTomlContent = `VERSION = "2.0.0"
NETWORK_PASSPHRASE = "Public Global Stellar Network ; September 2015"
ACCOUNTS = [
  "GCCZSP4KZVKIJLTY7HZS6TVNBFN6VB55A42HOLJHKCBVQRKDEVETUHHH"
]

[DOCUMENTATION]
ORG_NAME = "Rumsan"
ORG_DBA = "Rahat"
ORG_URL = "https://rahat.io"
ORG_LOGO = "https://rahat.io/logo.png"
ORG_DESCRIPTION = "Rahat is a blockchain-based platform for humanitarian cash and voucher assistance."
ORG_PHYSICAL_ADDRESS = "Kathmandu, Nepal"
ORG_OFFICIAL_EMAIL = "team@rumsan.net"

[[CURRENCIES]]
code = "RAHAT"
issuer = "GCCZSP4KZVKIJLTY7HZS6TVNBFN6VB55A42HOLJHKCBVQRKDEVETUHHH"
name = "Rahat Token"
desc = "Token used in humanitarian aid and disaster response"
image = "https://rahat.io/images/logo/rahat-logo.png"`;

    res.write(stellarTomlContent);
    res.end();

    return { props: {} };
}

export default function FundingManifestUrls() {
    return null;
}