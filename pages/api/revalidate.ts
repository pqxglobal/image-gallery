// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // regenerate our index route showing the images
    await res.revalidate('/')
    return res.json({ revalidated: true })
  } catch (err) {
    // if there was an error, Next.js will continue
    // to show the last succesfully generated page
    return res.status(500).send('Error revalidating')
  }
}











type Data = {
  name: string
}