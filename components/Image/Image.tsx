import { SyntheticEvent, useEffect, useState } from "react"
import NextImage, { ImageProps } from "next/image"

interface ImageWithFallbackProps extends ImageProps {
  fallback?: string
}

export const Image = ({
  fallback,
  width,
  height,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false)

  const _fallback = fallback || `https://placehold.co/${width}x${height}`

  const handleOnError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true)
  }

  useEffect(() => {
    setHasError(false)
  }, [src])

  return (
    <NextImage
      width={width}
      height={height}
      alt={alt}
      onError={handleOnError}
      src={hasError ? _fallback : src}
      {...props}
    />
  )
}
