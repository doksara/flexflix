import { Tokens } from "@pandacss/types"

import { radii } from "./radii"
import { spacing } from "./spacing"
import { sizes } from "./sizes"

const defineTokens = <T extends Tokens>(v: T) => v

export const tokens = defineTokens({
  radii,
  spacing,
  sizes,
})
