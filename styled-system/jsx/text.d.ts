/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { TextProperties } from '../patterns/text'
import type { HTMLStyledProps } from '../types/jsx'

export type TextProps = TextProperties & Omit<HTMLStyledProps<'p'>, keyof TextProperties >

/** Component for text rendering */
export declare const Text: FunctionComponent<TextProps>