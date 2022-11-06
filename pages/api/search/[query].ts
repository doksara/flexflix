import type { NextApiRequest, NextApiResponse } from 'next'
import { getJson } from '../..'
import { ApiResponse, TvListResultObject } from '../../../interface'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<TvListResultObject>>
) {
  const { query } = req.query
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
  
  
  getJson<ApiResponse<TvListResultObject>>(URL)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(404).json(error)
    })
}