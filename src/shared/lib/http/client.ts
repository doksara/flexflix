import { getUrl } from "utils"
import { ResponseObj } from "./interface"

export async function getJson<T>(url: string): Promise<T> {
  return fetch(getUrl(url), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
    },
  }).then((res) => res.json()) as Promise<T>
}

export const promiseWhen = <T = Response>(
  promises: Promise<T>[]
): Promise<ResponseObj<T>[]> => {
  return new Promise((resolve) => {
    const responses: { [index: number]: ResponseObj<T> } = {}

    const check = () => {
      if (promises.length === Object.keys(responses).length) {
        resolve(
          Object.keys(responses)
            .map(Number)
            .reduce((arr: ResponseObj<T>[], index) => {
              arr.push(responses[index])
              return arr
            }, [])
        )
      }
    }

    promises.forEach((promise, i) => {
      promise
        .then((response) => {
          responses[i] = { response }
          check()
        })
        .catch((error) => {
          responses[i] = { error }
          check()
        })
    })
  })
}
