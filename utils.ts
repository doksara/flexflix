export const DEFAULT_API_HOSTNAME = "api.themoviedb.org/3"
export const DEFAULT_IMAGE_HOSTNAME = "image.tmdb.org"

export const getUrl = (path: string) => `https://${DEFAULT_API_HOSTNAME + path}`

export const getImagePath = (filePath: string) => {
  const baseUrl = "https://image.tmdb.org/t/p"
  const fileSize = "w500"

  return `${baseUrl}/${fileSize}${filePath}`
}
