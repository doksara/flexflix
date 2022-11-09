import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, TvListResultObject } from '../../../interface'
import { getJson } from '../../../utils'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<TvListResultObject>>
) {  
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`

  console.log('yoo')
  getJson<ApiResponse<TvListResultObject>>(URL)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(404).json(error)
    })
}