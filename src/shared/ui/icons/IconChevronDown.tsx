import { IconProps } from "./IconSearch"

export const IconChevronDown = ({
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
      <path d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
    </svg>
  )
}
