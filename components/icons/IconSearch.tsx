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
  width,
  height,
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      width={size || width || 20}
      height={size || height || 20}
      {...props}
    >
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  )
}
