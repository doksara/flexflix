import styled from "styled-components"
import {
  position,
  space,
  layout,
  size,
  PositionProps,
  SpaceProps,
  LayoutProps,
  SizeProps,
  border,
  BorderProps,
} from "styled-system"

export interface BoxProps
  extends PositionProps,
    SpaceProps,
    LayoutProps,
    SizeProps,
    BorderProps {
  children: React.ReactNode
}

export const Box = styled.div<BoxProps>`
  ${position};
  ${border};
  ${space};
  ${layout};
  ${size}
`
