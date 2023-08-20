import { styled } from "styled-system/jsx"

export const Label = styled("label", {
  base: {
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    color: "#111827",
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: "0",
  },
})

export const IconWrapper = styled("div", {
  base: {
    display: "flex",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    paddingLeft: "0.75rem",
    alignItems: "center",
    pointerEvents: "none",
  },
})

export const Input = styled("input", {
  base: {
    display: "block",
    padding: ".5rem",
    paddingLeft: "2.5rem",
    borderRadius: "0.5rem",
    borderWidth: "1px",
    borderColor: "#D1D5DB",
    width: "100%",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
})
