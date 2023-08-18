import { styled } from "styled-system/jsx"

export const Button = styled("button", {
  base: {
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    textAlign: "center",
    color: "#ffffff",
    backgroundImage: "linear-gradient(to right, #9061f9, #6c2bd9)",
    backgroundColor: "#8B5CF6",
    transition: "all 0.2s ease",

    _hover: {
      backgroundImage: "linear-gradient(to bottom right, #9061f9, #6c2bd9)",
    },
  },
})
