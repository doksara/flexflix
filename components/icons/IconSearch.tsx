import { CSSProperties } from "@nextui-org/react/types/theme"

export interface IconProps {
  size?: CSSProperties["height"] | CSSProperties["width"]
  fill?: CSSProperties["fill"]
  width?: CSSProperties["height"]
  height?: CSSProperties["width"]
}

export const IconSearch = ({
  size,
  fill,
  width = 24,
  height = 24,
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
      <path
        d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}
