import styled from "styled-components"

type Props = {
  height: number
}

export const MovieCard = styled.div`
  position: relative;
  border-radius: 12px;
`

export const MovieCardTitle = styled.p`
  color: rgba(255, 255, 255, 0.667);
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
`

export const MovieCardSubtitle = styled.h4`
  color: white;
  text-transform: none;
  letter-spacing: -0.05em;
  font-size: 1.25rem;
  font-weight: 600;
`

export const MovieCardHeader = styled.div`
  position: absolute;
  width: 100%;
  padding: 8px;
  z-index: 1;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
`

export const MovieCardImageWrapper = styled.div<Props>`
  width: 100%;
  height: ${(p) => p.height}px;
  border-radius: 12px;
`
