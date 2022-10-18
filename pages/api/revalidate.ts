import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== "zhaojialei") {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }

  try {
    await res.revalidate(`/posts/${req.query.postID}`);
    return res.json({ revalidate: true });
  } catch (err) {
    return res.status(500).send("Error revalidate.");
  }
}
