export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        res.status(200).json({ id, message: 'Author data fetched successfully' });
    }
}