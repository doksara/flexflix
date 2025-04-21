import { styled } from "styled-system/jsx"

export const Label = styled("label", {
  base: {
    borderRadius: 16,
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    width: "auto",
    cursor: "pointer",
    zIndex: 1,
    opacity: 1,
    transition: "opacity 0.25s ease 0s",
  },
})

export const Input = styled("input", {})
