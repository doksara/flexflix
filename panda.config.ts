import { defineConfig } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"
import { accent, gray } from "./colors"

export default defineConfig({
  preflight: true,

  presets: [
    createPreset({ accentColor: accent, grayColor: gray, radius: "sm" }),
  ],

  include: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./app/**/*.{js,jsx,ts,tsx,vue}"],

  jsxFramework: "react",

  outdir: "styled-system",
})
