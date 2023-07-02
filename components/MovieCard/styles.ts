import styled from "styled-components"
export const MovieCard = styled.div`
  position: relative;
  overflow: hidden;
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
  margin-top: 4px;
`

export const MovieCardPocket = styled.div`
  position: absolute;
  width: 100%;
  padding: 12px;
  z-index: 1;
  bottom: 0;
  background: #000000aa;
`

export const MovieCardImageWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
`
