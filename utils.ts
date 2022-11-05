export type ResponseObj<T> = { response?: T; error?: Error }

export const promiseWhen = <T = Response>(promises: Promise<T>[]): Promise<ResponseObj<T>[]> => {
  return new Promise(resolve => {
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
          .then(response => {
            responses[i] = { response }
            check()
          })
          .catch(error => {
            responses[i] = { error }
            check()
          })
      })
    })
  }