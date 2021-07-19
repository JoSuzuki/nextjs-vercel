import type { NextApiRequest, NextApiResponse } from 'next'
import faunadb from 'faunadb'

interface ResponseData {
  hits: number | null
  error?: string
}

interface QueryResponse {
  ref: string
  data: {
    hits: number
  }
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY as string,
  })

  const { route } = req.query
  if (!route) {
    return res.status(400).json({
      hits: null,
      error: "Article 'route' not provided",
    })
  }
  // Check and see if the doc exists.
  const doesDocExist = await client.query<boolean>(
    q.Exists(q.Match(q.Index('hits_by_route'), route)),
  )
  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection('hits'), {
        data: { route, hits: 0 },
      }),
    )
  }

  // Fetch the document for-real
  const document = await client.query<QueryResponse>(
    q.Get(q.Match(q.Index('hits_by_route'), route)),
  )

  await client.query(
    q.Update(document.ref, {
      data: {
        hits: q.Add(q.Select(['data', 'hits'], q.Get(document.ref)), 1),
      },
    }),
  )

  return res.status(200).json({
    hits: document.data.hits + 1,
  })
}
