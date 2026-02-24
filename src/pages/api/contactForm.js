import mailer from "../../utils/mailer";
export const runtime = 'experimental-edge';
export default async function handler(req, res) {
    if (req.method === "POST") {
        // const { body } = req;
        // console.log("body", body);
        // const { payload, token } = JSON.parse(body);
        // console.log("payload", payload);
        // if (!payload || !token) throw new Error("Oops! Something went wrong.");
        try {
            await mailer
                .contactForm(req.body)
                .then((d) => {
                    res.status(200).json(d);
                })
                .catch((e) => res.status(500).json(e));
        } catch (e) {
            return res.status(422).json({ message: "Something went wrong" });
        }
    } else {
        // Handle any other HTTP method
    }
}

