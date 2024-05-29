import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Process a POST request
        console.log("CREATION")
        console.log("CREATION", req.body)
        res.status(201).json({data: {
                id: 6,
                name:req.body.name,
                email: req.body.email,
                phone: "+33"+req.body.phone
            }})
    } else {
        res.status(200).json({ message: 'Hello from Next.js!' })    }
}