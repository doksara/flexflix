import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, TvListResultObject } from '../../../interface'
import { getJson } from '../../../utils'


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<TvListResultObject>>
) => {  
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`

  const data = await getJson<ApiResponse<TvListResultObject>>(URL)

  if (data) {
    res.status(200).json(data)
  } else {
    res.status(404)
  }
}

export default handler