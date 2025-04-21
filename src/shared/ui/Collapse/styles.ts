import { styled } from "../../../../styled-system/jsx"

export const Collapse = styled("section", {
  base: {
    width: "100%",
  },
})

export const CollapseHeader = styled("div", {
  base: {
    position: "relative",
    cursor: "pointer",

    "& > div": {
      position: "absolute",
      right: 0,
      top: "60%",
      transform: "translateY(-50%)",
    },
  },
})

export const CollapseContent = styled("div", {
  base: {
    overflow: "hidden",
    transition: "height 0.2s ease-in-out",
  },
})
