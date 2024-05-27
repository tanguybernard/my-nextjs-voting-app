import { NextApiRequest, NextApiResponse } from "next";

import { wordGenerator } from "@/util/ApiRandom";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query as { slug: string };
    try {
        const randomWord = await wordGenerator(slug);
        res.json({ randomWord });
    } catch (e) {
        res.status(400).json({ error: (e as Error).message });
    }
};