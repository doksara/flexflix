import { IconProps } from "./IconSearch"

export const IconChevronUp = ({
  fill,
  size,
  height,
  width,
  ...props
}: IconProps) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height={size || height}
      width={size || width}
      {...props}
    >
      <path d="M18.707 14.293l-6-6c-0.391-0.391-1.024-0.391-1.414 0l-6 6c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
    </svg>
  )
}
