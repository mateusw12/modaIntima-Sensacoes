import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "reCAPTCHA token is missing" });
    }

    try {
      const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_PRIVATE_KEY
      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

      const { data } = await axios.post(verificationUrl, null, {
        params: {
          secret: secretKey,
          response: token,
        },
      });

      if (data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Failed reCAPTCHA verification" });
      }
    } catch (error) {
      console.error("Error verifying reCAPTCHA", error);
      return res.status(500).json({ error: "Error verifying reCAPTCHA" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
