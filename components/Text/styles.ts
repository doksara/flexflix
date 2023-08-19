import { styled } from "styled-system/jsx"

export const Text = styled("p", {
  base: {
    lineHeight: 1.5,
  },
  variants: {
    variant: {
      heading: {
        fontSize: "2xl",
        fontWeight: 700,
        letterSpacing: "-0.6px",
      },
      body: {
        fontSize: "md",
        fontWeight: 400,
      },
      caption: {
        color: "gray.500",
        fontSize: "sm",
        fontWeight: 400,
      },
    },
  },
})
