import styled from "styled-components"

export const MainContainer = styled.div`
  max-width: 90rem;
  display: block;

  margin-left: auto;
  margin-right: auto;

  padding-left: 1.5rem;
  padding-right: 1.5rem;
`

export const MainGrid = styled.ul`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  margin: calc(-1 * 0.75rem);
  width: calc(100% + 0.75rem * 2);
`

export const MainGridItem = styled.li<{ children: React.ReactNode }>`
  list-style: none; // move this to global styles

  margin: 0px;
  box-sizing: border-box;
  padding: 0.75rem;

  flex-grow: 0;
  display: inherit;
  max-width: 20%;
  flex-basis: 20%;
`
