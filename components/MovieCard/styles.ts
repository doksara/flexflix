import { styled } from "../../styled-system/jsx"

export const MovieCardTitle = styled("p", {
  base: {
    color: "neutral.200",
    fontSize: "md",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
})

export const MovieCardSubtitle = styled("h4", {
  base: {
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "white",
    textTransform: "none",
    letterSpacing: "-0.05em",
    fontSize: "1.25rem",
    fontWeight: 600,
    marginTop: 1,
  },
})

export const MovieCardPocket = styled("div", {
  base: {
    position: "absolute",
    width: "100%",
    padding: "12px",
    zIndex: 1,
    bottom: "0",
    background: "#000000aa",
  },
})
