export const DEFAULT_API_BRANCH = "api.themoviedb.org/3"

export const getUrl = (path: string) => `https://${DEFAULT_API_BRANCH + path}`

export async function getJson<T>(url: string): Promise<T> {
  return fetch(getUrl(url), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
    },
  }).then((res) => res.json()) as Promise<T>
}

export const getImagePath = (filePath: string) => {
  const baseUrl = "https://image.tmdb.org/t/p"
  const fileSize = "w500"

  return `${baseUrl}/${fileSize}${filePath}`
}

export type ResponseObj<T> = { response?: T; error?: Error }

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
