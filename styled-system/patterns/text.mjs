import { mapObject } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const textConfig = {
transform(props) {
  return {
    color: void 0
  };
}}

export const getTextStyle = (styles = {}) => textConfig.transform(styles, { map: mapObject })

export const text = (styles) => css(getTextStyle(styles))