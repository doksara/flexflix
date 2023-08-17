import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  // Choose framework
  jsxFramework: "react",

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",

  patterns: {
    extend: {
      text: {
        jsx: "Text",
        jsxElement: "p",
        description: "Component for text rendering",
        properties: {
          variant: {
            type: "enum",
            value: ["title", "subtitle", "body", "caption"],
          },
        },
        transform(props: unknown) {
          return {
            color: undefined,
          }
        },
      },
    },
  },
})
