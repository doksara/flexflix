import { createElement, forwardRef } from 'react'
import { styled } from './factory.mjs';
import { getTextStyle } from '../patterns/text.mjs';

export const Text = forwardRef(function Text(props, ref) {
  const { variant, ...restProps } = props
const styleProps = getTextStyle({variant})
return createElement(styled.p, { ref, ...styleProps, ...restProps })
})    