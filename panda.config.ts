import { defineConfig } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"
import { accent, gray } from "./src/shared/ui/styled/tokens/colors"
import { globalCss } from "globalCss"
import { tokens } from "@/shared/ui/styled/tokens/tokens"

export default defineConfig({
  preflight: true,

  presets: [
    createPreset({ accentColor: accent, grayColor: gray, radius: "sm" }),
  ],

  include: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./app/**/*.{js,jsx,ts,tsx,vue}"],

  jsxFramework: "react",

  outdir: "styled-system",

  theme: {
    extend: {
      tokens,
    },
  },

  globalCss: globalCss,

  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
})
