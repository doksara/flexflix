import { defineConfig } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"
import { accent, gray } from "./colors"
import { globalCss } from "globalCss"

export default defineConfig({
  preflight: true,

  presets: [
    createPreset({ accentColor: accent, grayColor: gray, radius: "sm" }),
  ],

  include: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./app/**/*.{js,jsx,ts,tsx,vue}"],

  jsxFramework: "react",

  outdir: "styled-system",

  globalCss: globalCss,

  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
})
