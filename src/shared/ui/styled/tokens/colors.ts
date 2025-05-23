import { defineSemanticTokens } from "@pandacss/dev"

import { defineTokens } from "@pandacss/dev"

export const accent = {
  name: "colorPalette",
  tokens: defineTokens.colors({
    light: {
      "1": { value: "#fefcfe" },
      "2": { value: "#fdf7fd" },
      "3": { value: "#faecfb" },
      "4": { value: "#f7e0f8" },
      "5": { value: "#f2d2f2" },
      "6": { value: "#eac1eb" },
      "7": { value: "#deabe0" },
      "8": { value: "#d08dd3" },
      "9": { value: "#37003b" },
      "10": { value: "#501a53" },
      "11": { value: "#8b4c8e" },
      "12": { value: "#4f1952" },

      a1: { value: "#aa00aa03" },
      a2: { value: "#c000c008" },
      a3: { value: "#bc00ca13" },
      a4: { value: "#be00c61f" },
      a5: { value: "#b600b62d" },
      a6: { value: "#a900ad3e" },
      a7: { value: "#9b00a154" },
      a8: { value: "#96009d72" },
      a9: { value: "#37003b" },
      a10: { value: "#3c0040e5" },
      a11: { value: "#5a005eb3" },
      a12: { value: "#3c003fe6" },

      /*      contrast: { value: "#fff" },
      surface: { value: "#fdf5fdcc" },
      indicator: { value: "#37003b" },
      track: { value: "#37003b" }, */
    },

    dark: {
      "1": { value: "#180c19" },
      "2": { value: "#240d26" },
      "3": { value: "#3e0742" },
      "4": { value: "#530059" },
      "5": { value: "#600066" },
      "6": { value: "#6e1074" },
      "7": { value: "#832989" },
      "8": { value: "#9f46a5" },
      "9": { value: "#aa50af" },
      "10": { value: "#9b42a1" },
      "11": { value: "#ee90f4" },
      "12": { value: "#ffcaff" },

      a1: { value: "#d800f409" },
      a2: { value: "#e400fa17" },
      a3: { value: "#ea00fd35" },
      a4: { value: "#e900fd4e" },
      a5: { value: "#ec00fd5c" },
      a6: { value: "#ef0ffd6b" },
      a7: { value: "#f341ff81" },
      a8: { value: "#f566ff9f" },
      a9: { value: "#f66ffeaa" },
      a10: { value: "#f461fe9b" },
      a11: { value: "#f895fef4" },
      a12: { value: "#ffcaff" },

      /*      contrast: { value: "#fff" },
      surface: { value: "#370a3b80" },
      indicator: { value: "#aa50af" },
      track: { value: "#aa50af" }, */
    },
  }),

  semanticTokens: defineSemanticTokens.colors({
    "1": {
      value: {
        _light: "{colors.colorPalette.light.1}",
        _dark: "{colors.colorPalette.dark.1}",
      },
    },
    "2": {
      value: {
        _light: "{colors.colorPalette.light.2}",
        _dark: "{colors.colorPalette.dark.2}",
      },
    },
    "3": {
      value: {
        _light: "{colors.colorPalette.light.3}",
        _dark: "{colors.colorPalette.dark.3}",
      },
    },
    "4": {
      value: {
        _light: "{colors.colorPalette.light.4}",
        _dark: "{colors.colorPalette.dark.4}",
      },
    },
    "5": {
      value: {
        _light: "{colors.colorPalette.light.5}",
        _dark: "{colors.colorPalette.dark.5}",
      },
    },
    "6": {
      value: {
        _light: "{colors.colorPalette.light.6}",
        _dark: "{colors.colorPalette.dark.6}",
      },
    },
    "7": {
      value: {
        _light: "{colors.colorPalette.light.7}",
        _dark: "{colors.colorPalette.dark.7}",
      },
    },
    "8": {
      value: {
        _light: "{colors.colorPalette.light.8}",
        _dark: "{colors.colorPalette.dark.8}",
      },
    },
    "9": {
      value: {
        _light: "{colors.colorPalette.light.9}",
        _dark: "{colors.colorPalette.dark.9}",
      },
    },
    "10": {
      value: {
        _light: "{colors.colorPalette.light.10}",
        _dark: "{colors.colorPalette.dark.10}",
      },
    },
    "11": {
      value: {
        _light: "{colors.colorPalette.light.11}",
        _dark: "{colors.colorPalette.dark.11}",
      },
    },
    "12": {
      value: {
        _light: "{colors.colorPalette.light.12}",
        _dark: "{colors.colorPalette.dark.12}",
      },
    },

    a1: {
      value: {
        _light: "{colors.colorPalette.light.a1}",
        _dark: "{colors.colorPalette.dark.a1}",
      },
    },
    a2: {
      value: {
        _light: "{colors.colorPalette.light.a2}",
        _dark: "{colors.colorPalette.dark.a2}",
      },
    },
    a3: {
      value: {
        _light: "{colors.colorPalette.light.a3}",
        _dark: "{colors.colorPalette.dark.a3}",
      },
    },
    a4: {
      value: {
        _light: "{colors.colorPalette.light.a4}",
        _dark: "{colors.colorPalette.dark.a4}",
      },
    },
    a5: {
      value: {
        _light: "{colors.colorPalette.light.a5}",
        _dark: "{colors.colorPalette.dark.a5}",
      },
    },
    a6: {
      value: {
        _light: "{colors.colorPalette.light.a6}",
        _dark: "{colors.colorPalette.dark.a6}",
      },
    },
    a7: {
      value: {
        _light: "{colors.colorPalette.light.a7}",
        _dark: "{colors.colorPalette.dark.a7}",
      },
    },
    a8: {
      value: {
        _light: "{colors.colorPalette.light.a8}",
        _dark: "{colors.colorPalette.dark.a8}",
      },
    },
    a9: {
      value: {
        _light: "{colors.colorPalette.light.a9}",
        _dark: "{colors.colorPalette.dark.a9}",
      },
    },
    a10: {
      value: {
        _light: "{colors.colorPalette.light.a10}",
        _dark: "{colors.colorPalette.dark.a10}",
      },
    },
    a11: {
      value: {
        _light: "{colors.colorPalette.light.a11}",
        _dark: "{colors.colorPalette.dark.a11}",
      },
    },
    a12: {
      value: {
        _light: "{colors.colorPalette.light.a12}",
        _dark: "{colors.colorPalette.dark.a12}",
      },
    },

    default: {
      value: {
        _light: "{colors.colorPalette.light.9}",
        _dark: "{colors.colorPalette.dark.9}",
      },
    },
    emphasized: {
      value: {
        _light: "{colors.colorPalette.light.10}",
        _dark: "{colors.colorPalette.dark.10}",
      },
    },
    fg: {
      value: {
        _light: "white",
        _dark: "white",
      },
    },
    text: {
      value: {
        _light: "{colors.colorPalette.light.11}",
        _dark: "{colors.colorPalette.dark.11}",
      },
    },
  }),
}

export const gray = {
  name: "gray",
  tokens: defineTokens.colors({
    light: {
      "1": { value: "#fcfcfd" },
      "2": { value: "#f9f9fb" },
      "3": { value: "#eff0f3" },
      "4": { value: "#e7e8ec" },
      "5": { value: "#e0e1e6" },
      "6": { value: "#d8d9e0" },
      "7": { value: "#cdced7" },
      "8": { value: "#b9bbc6" },
      "9": { value: "#8b8d98" },
      "10": { value: "#80828d" },
      "11": { value: "#62636c" },
      "12": { value: "#1e1f24" },

      a1: { value: "#00005503" },
      a2: { value: "#00005506" },
      a3: { value: "#00104010" },
      a4: { value: "#000b3618" },
      a5: { value: "#0009321f" },
      a6: { value: "#00073527" },
      a7: { value: "#00063332" },
      a8: { value: "#00083046" },
      a9: { value: "#00051d74" },
      a10: { value: "#00051b7f" },
      a11: { value: "#0002119d" },
      a12: { value: "#000107e1" },

      /*       contrast: { value: "#fff" },
      surface: { value: "#ffffffcc" },
      indicator: { value: "#8b8d98" },
      track: { value: "#8b8d98" }, */
    },

    dark: {
      "1": { value: "#111113" },
      "2": { value: "#19191b" },
      "3": { value: "#222325" },
      "4": { value: "#292a2e" },
      "5": { value: "#303136" },
      "6": { value: "#393a40" },
      "7": { value: "#46484f" },
      "8": { value: "#5f606a" },
      "9": { value: "#6c6e79" },
      "10": { value: "#797b86" },
      "11": { value: "#b2b3bd" },
      "12": { value: "#eeeef0" },

      a1: { value: "#1111bb03" },
      a2: { value: "#cbcbf90b" },
      a3: { value: "#d6e2f916" },
      a4: { value: "#d1d9f920" },
      a5: { value: "#d7ddfd28" },
      a6: { value: "#d9defc33" },
      a7: { value: "#dae2fd43" },
      a8: { value: "#e0e3fd60" },
      a9: { value: "#e0e4fd70" },
      a10: { value: "#e3e7fd7e" },
      a11: { value: "#eff0feb9" },
      a12: { value: "#fdfdffef" },

      /*       contrast: { value: "#FFFFFF" },
      surface: { value: "#111113cc" },
      indicator: { value: "#6c6e79" },
      track: { value: "#6c6e79" }, */
    },
  }),

  semanticTokens: defineSemanticTokens.colors({
    "1": {
      value: {
        _light: "{colors.gray.light.1}",
        _dark: "{colors.gray.dark.1}",
      },
    },
    "2": {
      value: {
        _light: "{colors.gray.light.2}",
        _dark: "{colors.gray.dark.2}",
      },
    },
    "3": {
      value: {
        _light: "{colors.gray.light.3}",
        _dark: "{colors.gray.dark.3}",
      },
    },
    "4": {
      value: {
        _light: "{colors.gray.light.4}",
        _dark: "{colors.gray.dark.4}",
      },
    },
    "5": {
      value: {
        _light: "{colors.gray.light.5}",
        _dark: "{colors.gray.dark.5}",
      },
    },
    "6": {
      value: {
        _light: "{colors.gray.light.6}",
        _dark: "{colors.gray.dark.6}",
      },
    },
    "7": {
      value: {
        _light: "{colors.gray.light.7}",
        _dark: "{colors.gray.dark.7}",
      },
    },
    "8": {
      value: {
        _light: "{colors.gray.light.8}",
        _dark: "{colors.gray.dark.8}",
      },
    },
    "9": {
      value: {
        _light: "{colors.gray.light.9}",
        _dark: "{colors.gray.dark.9}",
      },
    },
    "10": {
      value: {
        _light: "{colors.gray.light.10}",
        _dark: "{colors.gray.dark.10}",
      },
    },
    "11": {
      value: {
        _light: "{colors.gray.light.11}",
        _dark: "{colors.gray.dark.11}",
      },
    },
    "12": {
      value: {
        _light: "{colors.gray.light.12}",
        _dark: "{colors.gray.dark.12}",
      },
    },

    a1: {
      value: {
        _light: "{colors.gray.light.a1}",
        _dark: "{colors.gray.dark.a1}",
      },
    },
    a2: {
      value: {
        _light: "{colors.gray.light.a2}",
        _dark: "{colors.gray.dark.a2}",
      },
    },
    a3: {
      value: {
        _light: "{colors.gray.light.a3}",
        _dark: "{colors.gray.dark.a3}",
      },
    },
    a4: {
      value: {
        _light: "{colors.gray.light.a4}",
        _dark: "{colors.gray.dark.a4}",
      },
    },
    a5: {
      value: {
        _light: "{colors.gray.light.a5}",
        _dark: "{colors.gray.dark.a5}",
      },
    },
    a6: {
      value: {
        _light: "{colors.gray.light.a6}",
        _dark: "{colors.gray.dark.a6}",
      },
    },
    a7: {
      value: {
        _light: "{colors.gray.light.a7}",
        _dark: "{colors.gray.dark.a7}",
      },
    },
    a8: {
      value: {
        _light: "{colors.gray.light.a8}",
        _dark: "{colors.gray.dark.a8}",
      },
    },
    a9: {
      value: {
        _light: "{colors.gray.light.a9}",
        _dark: "{colors.gray.dark.a9}",
      },
    },
    a10: {
      value: {
        _light: "{colors.gray.light.a10}",
        _dark: "{colors.gray.dark.a10}",
      },
    },
    a11: {
      value: {
        _light: "{colors.gray.light.a11}",
        _dark: "{colors.gray.dark.a11}",
      },
    },
    a12: {
      value: {
        _light: "{colors.gray.light.a12}",
        _dark: "{colors.gray.dark.a12}",
      },
    },

    /*     contrast: {
      value: {
        _light: "{colors.gray.light.contrast}",
        _dark: "{colors.gray.dark.contrast}",
      },
    },
    surface: {
      value: {
        _light: "{colors.gray.light.surface}",
        _dark: "{colors.gray.dark.surface}",
      },
    },
    indicator: {
      value: {
        _light: "{colors.gray.light.indicator}",
        _dark: "{colors.gray.dark.indicator}",
      },
    },
    track: {
      value: {
        _light: "{colors.gray.light.track}",
        _dark: "{colors.gray.dark.track}",
      },
    }, */
  }),
}
