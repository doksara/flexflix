import { styled } from "styled-system/jsx"

export const Label = styled("label", {
  base: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    color: "#111827",
  },
})

export const Field = styled("input", {
  base: {
    display: "block",
    padding: "0.625rem",
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
